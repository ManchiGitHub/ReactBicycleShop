import express from 'express';
import cors from 'cors';
import fs from 'fs';

const enum BicycleStatusEnum {
    FREE = "free",
    BUSY = "busy",
    BROKEN = "broken"
};

interface IBicycle {
    id: number;
    lights: boolean;
    status: BicycleStatusEnum,
    location: string,
    ip: string,
    currentUserId: number
}

interface IUser {
    id: number;
    name: string,
    funds: number,
    currentBicycleId: number
}

const app = express();
app.use(cors());
app.use(express.json());

const dbFilePath = 'db.json';

app.get('/users', (req, res) => {
    console.log("hit: /users");
    const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    res.json(db.users);
});

app.patch('/bicycles/updateLights', (req, res) => {
    console.log("hit: /updateLights")
    const { bicycles, lightsOn } = req.body;
    const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    bicycles.forEach((bicycleId: number) => {
        const bicycle = db.bicycles.find((b: { id: number }) => b.id === bicycleId);
        if (bicycle) {
            bicycle.lights = lightsOn;
            console.log(`updated lights of ${bicycle.id} to ${lightsOn}`);
        }

        fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
    });

    res.send('Bicycle lights updated successfully');
});

app.patch('/users/:userId/addFunds', (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const { fundsToAdd } = req.body;
    console.log(`hit: /users/:${userId}/addFunds with funds: ${fundsToAdd}`);

    if (!Number.isFinite(fundsToAdd) || fundsToAdd < 0) {
        console.log("what?");
        return res.status(400).send("Invalid funds amount");
    }

    const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    const user = (db.users as IUser[]).find(user => user.id === userId);
    if (!user) {
        return res.status(404).send('User not found');
    }

    // performed in memory
    user.funds += fundsToAdd;

    fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
    console.log(`Funds added to user ${userId}: ${fundsToAdd}`);
    res.json({ message: `Funds added successfully to user ${userId}` })
});

app.get('/bicycles', (req, res) => {
    console.log("hit: /bicycles");
    const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    res.json(db.bicycles);
});

app.post('/bicycles/lock-bicycle', (req, res) => {
    console.log(`hit: /bicycles/lock-bicycle`);
    const { bicycleId, userId, lockBicycle } = req.body;

    if (!bicycleId) {
        return res.status(400).send("Missing bicycle id");
    }

    const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    const existingBicycle: IBicycle = db.bicycles.find((b: IBicycle) => b.id === userId);

    if (!existingBicycle) {
        return res.status(400).send(`Bicyclet not found`);
    }

    if (existingBicycle.status === BicycleStatusEnum.BROKEN) {
        return res.status(409).send(`Bicycle ${bicycleId} is broken and cannot be used`);
    }

    const statusMap: { [key: string]: { expected: BicycleStatusEnum; newStatus: BicycleStatusEnum; action: string } } = {
        'true': { expected: BicycleStatusEnum.FREE, newStatus: BicycleStatusEnum.BUSY, action: 'locked' },
        'false': { expected: BicycleStatusEnum.BUSY, newStatus: BicycleStatusEnum.FREE, action: 'unlocked' }
    };

    const key = String(lockBicycle);
    const transition = statusMap[key];

    if (existingBicycle.status !== transition.expected) {
        return res.status(409).send(`Bicycle ${bicycleId} cannot be ${transition.action} as it is ${existingBicycle.status}`);
    }

    existingBicycle.status = transition.newStatus;
    existingBicycle.currentUserId = parseInt(userId);

    const user: IUser = db.users.find((user: IUser) => user.id === userId);
    user.currentBicycleId = existingBicycle.id;

    fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
    res.json({ message: `Successfully ${lockBicycle ? 'locked' : 'unlocked'} bicycle ${userId}` });
});

app.post('/bicycles/addBicycle', (req, res) => {
    console.log("hit: /addBicycle");
    const newBicycle = req.body.newBicycle;
    if (!newBicycle || !newBicycle.id || !newBicycle.location || !newBicycle.ip) {
        return res.status(400).send("Missing bicycle information");
    }

    const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

    const existingBicycle = db.bicycles.find((b: IBicycle) => b.id === newBicycle.id);
    if (existingBicycle) {
        return res.status(409).send("A bicycle with the same ID already exists");
    }

    db.bicycles.push(newBicycle);
    fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));

    console.log(`Added new bicycle with ID: ${newBicycle.id}`);
    return res.status(201).json({ message: `Bicycle with ID ${newBicycle.id} added successfully` });
});

app.get('/bicycles/last-bicycle-id', (req, res) => {
    console.log("hit: /bicycles/last-bicycle-id");
    const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    if (db.bicycles && db.bicycles.length > 0) {
        const lastBicycleId = Math.max(...db.bicycles.map((bicycle: IBicycle) => bicycle.id));
        res.json({ lastId: lastBicycleId })
    } else {
        res.status(404).json({ message: "No bicycles found" });
    }
});

app.post('/updateBicycleLights', (req, res) => {
    console.log("hit: /updateBicycleLights");
    const { bicycles, lightsOn }: { bicycles: IBicycle[]; lightsOn: boolean } = req.body;
    const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    db.bicycles.forEach((bicycle: IBicycle) => {
        if (bicycles.find(b => b.id === bicycle.id)) {
            bicycle.lights = lightsOn;
        }
    });
    fs.writeFileSync(dbFilePath, JSON.stringify(db));
    console.log("returning: Bicycle lights updated");
    res.json({ message: 'Bicycle lights updated' });
});

app.get('/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    console.log(`hit: /users/:${userId}`);
    const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    const user = db.users.find((user: IUser) => user.id === userId);
    if (!user) {
        res.status(404).send('User not found');
    }
    console.log("returning:", user);
    res.json(user);
});

app.get('/', (req, res) => {
    console.log("hit: / (home)");
    res.send(`
        <div style="text-align: center;">
            <p style="font-size: 55px;">My Server</p>
        </div>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});