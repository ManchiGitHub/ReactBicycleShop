import { useMemo } from 'react'
import './App.css'
import { RootStore } from './store/RootStore'
import { RootStoreProvider } from './store/common/RootStoreConext'
import { ContentContainer } from './components/ContentContainer'
import { Outlet } from 'react-router-dom'

const App = () => {

  const rootStore = useMemo(
    () => RootStore.create({
      error: 'asd',
      questions: [],
      difficultMode: false
    }),
    []
  );

  return (
    <RootStoreProvider value={rootStore}>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </RootStoreProvider>
  )
}

export default App
