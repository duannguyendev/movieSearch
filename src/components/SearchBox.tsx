import { isEmpty, last } from 'lodash'
import React, { useCallback, useContext } from 'react'
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  StyleProp,
  TextInputFocusEventData,
  TextInputKeyPressEventData,
  ViewStyle,
  TouchableWithoutFeedback
} from 'react-native'
import styled from 'styled-components/native'
import { text } from '../constants/text'
import { colors } from '../theme/colors'
import { fonts } from '../theme/fonts'
import { SearchViewType } from '../screens/movieSearch/movieSearchReducer'
import { AppReducerContext } from '../app/appReducer'

type Props = {
  value?: string
  onClearPress?: (event: GestureResponderEvent) => void
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  onChangeText?: (text: string) => void
  onRemove?: (text: string) => void
  onShowFiltersPress?: (event: GestureResponderEvent) => void
  onSearchPress?: (viewType?: SearchViewType) => void
  style?: StyleProp<ViewStyle>
}

const S = {
  Container: styled.View`
    margin: 0px;
  `,

  SearchInputContainer: styled.View`
    background-color: transparent;
    flex-direction: row;
    elevation: 0;
    shadow-opacity: 1;
    shadow-radius: 5px;
    shadow-color: rgba(0, 0, 0, 0.05);
    shadow-offset: 0 0;
    min-height: 48px;
  `,

  SearchInput: styled.TextInput`
    flex: 1;
    min-width: 60px;
    padding: 0px;
    margin-horizontal: 2px;
    color: ${colors.greyMedium};
    font-size: 14px;
    font-family: ${fonts.medium};
  `,

  Body: styled.View`
    flex-direction: row;
    align-items: center;
    padding-vertical: 6px;
    align-self: center;
    flex: 1;
    padding-horizontal: 6px;
    flex-wrap: wrap;
  `
}

const SearchBox: React.FC<Props> = props => {
  const { state } = useContext(AppReducerContext)

  // If the user hits backspace whilst the textbox is empty, remove the most
  // recently selected item.
  const onKeyPress = useCallback(
    (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      const isBackspace = event.nativeEvent.key === 'Backspace'
      if (isBackspace && isEmpty(props.value)) {
      }
    },
    [props]
  )

  return (
    <S.Container style={props.style}>
      <S.SearchInputContainer collapsable={false}>
        <TouchableWithoutFeedback>
          <S.Body>
            <S.SearchInput
              onFocus={props.onFocus}
              onBlur={e => {
                props.onBlur?.(e)
              }}
              value={props.value}
              placeholderTextColor={colors.stormGrey}
              onChangeText={props.onChangeText}
              onKeyPress={onKeyPress}
              placeholder={text.common.search}
            />
          </S.Body>
        </TouchableWithoutFeedback>
      </S.SearchInputContainer>
    </S.Container>
  )
}

export default SearchBox
