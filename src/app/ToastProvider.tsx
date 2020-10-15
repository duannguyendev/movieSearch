import React, { createContext, useMemo, useRef } from 'react'
import { StyleSheet } from 'react-native'
import Toast from 'react-native-easy-toast'
import styled from 'styled-components/native'
import { colors } from '../theme/colors'
import { fonts } from '../theme/fonts'

type ToastFunction = (message: string, duration: number) => void

const ToastContext = createContext<{
  info: ToastFunction
  error: ToastFunction
}>({
  info: () => {},
  error: () => {}
})

const S = {
  InfoToast: styled(Toast)`
    background: ${colors.purple};
    border-radius: 0px;
  `,
  ErrorToast: styled(Toast)`
    background: ${colors.deepRed};
    border-radius: 0px;
  `
}

const styles = StyleSheet.create({
  toastText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 18
  }
})

const ToastProvider: React.FC = props => {
  const infoToastRef = useRef<Toast | null>(null)
  const errorToastRef = useRef<Toast | null>(null)

  const providerValue = useMemo(() => {
    return {
      info: (message: string, duration: number) => {
        infoToastRef.current?.show(message, duration)
      },
      error: (message: string, duration: number) => {
        errorToastRef.current?.show(message, duration)
      }
    }
  }, [])

  // TODO https://github.com/crazycodeboy/react-native-easy-toast/issues/67.
  return (
    <>
      <S.InfoToast
        ref={infoToastRef}
        position='top'
        textStyle={styles.toastText}
      />

      <S.ErrorToast
        ref={errorToastRef}
        position='top'
        textStyle={styles.toastText}
      />

      <ToastContext.Provider value={providerValue}>
        {props.children}
      </ToastContext.Provider>
    </>
  )
}

export { ToastContext }
export default ToastProvider
