import { useEffect, useMemo } from 'react'
import './App.css'
import { RootStoreProvider } from './store/common/RootStoreContext'
import { RootStore } from './store/RootStore'
import { Outlet } from 'react-router-dom'
import { ContentContainer } from './components/ContentContainer'
import { NavigationBar } from './components/Navigation'


const App = () => {

  const rootStore = useMemo(
    () => RootStore.create({
      bicycleStore: {
        bicycles: [],
        navigationTitle: '',
      }
    }),
    []
  );

  useEffect(() => {
    rootStore.bicycleStore.fetchBicycles();
    rootStore.bicycleStore.fetchUsers();
  }, []);

  return (
    <div>
      <RootStoreProvider value={rootStore}>
        <div className='flex flex-col h-screen inset-0 p-0'>
          <ContentContainer>
            <NavigationBar />
            <Outlet />
          </ContentContainer>
        </div>
      </RootStoreProvider>
    </div>
  )
}

export default App;
