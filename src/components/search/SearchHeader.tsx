import React, { RefObject, useCallback } from 'react'
import {
  StyleProp,
  ViewStyle,
  View,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TouchableOpacity
} from 'react-native'
import styled from 'styled-components/native'
import { SearchViewType } from '../../screens/movieSearch/movieSearchReducer'
import { text } from '../../constants/text'
import { colors } from '../../theme/colors'
import Dropdown from '../../components/common/Dropdown'
import options from '../../constants/options'
import SearchBox from '../../components/SearchBox'
import TouchableText from '../common/TouchableText'

type Props = {
  onFiltersPress?: () => void
  onSortByChanged?: (sortBy: string) => void
  viewType: SearchViewType
  onViewTypeChange: (viewType: SearchViewType) => void
  style?: StyleProp<ViewStyle>
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  onChangeText?: (text: string) => void
  onSearchPress?: (viewType?: SearchViewType) => void
  onRemove?: (item: string) => void
  onClearPress?: () => void
  value?: string
  sortBy?: string
  alertFrequency?: number
}

const S = {
  Line: styled.View`
    height: 1px;
    width: 100%;
    background-color: ${colors.pattensBlue};
  `,

  SafeAreaView: styled.SafeAreaView`
    background-color: ${colors.aliceBlue};
  `,

  TopView: styled.View`
    flex-direction: row;
    padding-horizontal: 0px;
    align-items: center;
  `,

  Input: styled.TextInput`
    padding: 0px;
    flex: 1;
    margin-left: 10px;
    height: 48px;
  `,

  Dropdown: styled(Dropdown)`
    border-width: 1px;
    border-color: ${colors.purple};
    height: 28px;
    justify-content: center;
    margin-horizontal: 4px;
    border-radius: 14px;
  `,

  HorizontalMenuContainer: styled.View`
    shadow-color: rgba(52, 55, 64, 0.15);
    shadow-opacity: 1;
    shadow-radius: 1px;
    elevation: 2;
    shadow-offset: 1px 1px;
    margin-bottom: 2px;
  `,

  SearchBox: styled(SearchBox)`
    flex: 1;
  `,

  Row: styled.View`
    flex-direction: row;
    margin-vertical: 14px;
    justify-content: center;
    align-items: center;
  `,

  Touchable: styled(TouchableText)`
    margin-horizontal: 4px;
  `
}

const SearchHeader: React.FC<Props> = props => {
  const handleSortByChanged = useCallback(
    (it: string) => {
      props.onSortByChanged && props.onSortByChanged(it)
    },
    [props]
  )

  return (
    <View style={props.style}>
      <S.SafeAreaView>
        <S.TopView>
          <S.SearchBox
            onRemove={props.onRemove}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            value={props.value}
            onChangeText={props.onChangeText}
            onSearchPress={props.onSearchPress}
            onShowFiltersPress={props.onFiltersPress}
            onClearPress={props.onClearPress}
          />
        </S.TopView>
        <S.Line />
        <S.Row>
          {props.viewType !== 'this_year' && (
            <S.Touchable
              onPress={() => props.onViewTypeChange('this_year')}
              text={'This year'}
            />
          )}
          {props.viewType !== 'last_year' && (
            <S.Touchable
              onPress={() => props.onViewTypeChange('last_year')}
              text={'Last year'}
            />
          )}
          <S.Dropdown
            onValueChange={handleSortByChanged}
            options={options.sortBy.map(({ label }) => label)}
            label={props.sortBy ?? options.sortBy[2].label}
            value={props.sortBy ?? options.sortBy[2].label}
            fontSize='14px'
            textColor={colors.purple}
            textAlign='center'
            hideArrow
            small
          />
        </S.Row>
      </S.SafeAreaView>
    </View>
  )
}

export default SearchHeader
