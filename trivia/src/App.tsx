import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RootStore } from './store/RootStore'
import { RootStoreProvider } from './store/common/RootStoreConext'
import { ContentContainer } from './components/ContentContainer'
import { Outlet } from 'react-router-dom'
import { onSnapshot } from 'mobx-state-tree'

const App = () => {

  const rootStore = useMemo(
    () => RootStore.create({
      error: 'asd',
      questions: []
    }),
    []
  );

  const [count, setCount] = useState(0)

  return (
    <RootStoreProvider value={rootStore}>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </RootStoreProvider>
  )
}

export default App
