import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import clsx from 'clsx'

import AppTitle from '@app/components/atoms/app-title'
import Header from '@app/components/molecules/header'

import useLayout from './use-layout'
import './layout.scss'
import ModalLoading from '@app/components/atoms/modal-loading/modal-loading'

const Layout: FC = () => {
  const {
    contextValue,
    isFlowEndSuccess,
    title,
    showHeader,
    showModal,
    isLoading,
    fallBackElement,
  } = useLayout()

  return (
    <>
      {showHeader && (
        <Header
          isLoading={isLoading}
          hiddenActionable={isFlowEndSuccess}
          classes={{ root: clsx(isFlowEndSuccess && 'header--success') }}
        >
          <AppTitle isSuccess={isFlowEndSuccess}>{title}</AppTitle>
        </Header>
      )}
      <main className={clsx('layout', { 'layout--full': !showHeader || isLoading })}>
        <div className="layout__content">
          {isLoading ? fallBackElement : <Outlet context={contextValue} />}
        </div>
      </main>
      {showModal && <ModalLoading>Espera un momento</ModalLoading>}
    </>
  )
}

export default Layout
