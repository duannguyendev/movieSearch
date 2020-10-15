import React, { useMemo, useCallback } from 'react'
import { Dimensions, FlatList, StyleProp, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { Movie } from '../../services/apiTypes'
import { colors } from '../../theme/colors'
import LoadingIndicator from '../common/LoadingIndicator'
import Text from '../common/Text'
import MovieCard from '../movieCard/MovieCard'
import CardItem from './CardItem'

type Props = {
  movies: Movie[]
  style?: StyleProp<ViewStyle>
  headerText: string
  handleLoadMore?: () => void
  isAllDataLoaded: boolean
}

type HeaderProps = {
  headerText: string
  style?: StyleProp<ViewStyle>
}

const S = {
  TotalText: styled(Text)`
    font-size: 21px;
    margin-bottom: 10px;
    margin-top: 16px;
    color: ${colors.grey};
  `,

  HeaderContainer: styled.View`
    padding-horizontal: 14px;
  `,

  MovieCard: styled(MovieCard)`
    width: ${Dimensions.get('window').width - 28}px;
    margin: 0px;
  `,

  LoadingIndicator: styled(LoadingIndicator)`
    margin-vertical: 12px;
  `,

  Container: styled.View`
    background-color: ${colors.aliceBlue};
    flex: 1;
  `,

  SaveSearch: styled.View`
    flex-direction: row;
    margin-bottom: 10px;
    margin-top: 16px;
    align-items: center;
  `,

  IconWrap: styled.TouchableOpacity`
    margin: 4px;
  `
}

const Header: React.FC<HeaderProps> = props => {
  return (
    <S.HeaderContainer style={props.style}>
      <S.TotalText>{props.headerText}</S.TotalText>
    </S.HeaderContainer>
  )
}

const ResultCards: React.FC<Props> = props => {
  const { handleLoadMore, isAllDataLoaded } = props
  const footer = useMemo(() => {
    return isAllDataLoaded ? <></> : <S.LoadingIndicator />
  }, [isAllDataLoaded])

  const renderItem = useCallback(
    ({ item }) => <CardItem key={item.id} item={item} />,
    []
  )
  return (
    <S.Container>
      <FlatList
        style={props.style}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Header headerText={props.headerText} />
          </>
        }
        ListFooterComponent={footer}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        data={props.movies}
        onEndReached={() => handleLoadMore && handleLoadMore()}
        onEndReachedThreshold={(props.movies.length - 10) / props.movies.length}
        initialNumToRender={props.movies.length}
        maxToRenderPerBatch={50}
      />
    </S.Container>
  )
}

export default ResultCards
