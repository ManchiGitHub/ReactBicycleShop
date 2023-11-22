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
    ip: string
}

interface IUser {
    id: number;
    name: string,
    funds: number
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
    res.json({message: `Funds added successfully to user ${userId}`})
});

app.get('/bicycles', (req, res) => {
    console.log("hit: /bicycles");
    const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    res.json(db.bicycles);
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