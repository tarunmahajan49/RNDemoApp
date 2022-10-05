import React, { memo, useCallback, useEffect, useState } from 'react';
import { SafeAreaView, FlatList } from 'react-native';

import ListData from '../../utils/fake-data';
import ListItem from './components/item';

//
//

export interface IListItem {
  id: string;
  name: string;
  description: String;
  price: string;
  salePrice: any;
  brand: String;
}

const ListScreen = () => {
  const [offset, setOffset] = useState(1); //Its Like Page number
  const [data, setData] = useState<IListItem[]>(ListData); //Contains the whole data
  const [dataSource, setDataSource] = useState<IListItem[]>([]); //Contains limited number of data
  let initialLoadNumber = 10
  let num = 10

  useEffect(() => { //Here we setting our data source on first open.
    if (dataSource.length < data.length) {
      if (offset == 1) {
        setDataSource(data.slice(0, offset * initialLoadNumber))
      }
    }
  }, [data]);

  const getData = useCallback(() => { // When scrolling we set data source with more data.
    if (dataSource.length < data.length && data.length != 0) {
      setOffset(offset + 1);
      setDataSource(data.slice(0, offset * num)) //We changed dataSource.
    }
  },[]);


  const renderItem = ({ item, index }: any) => {
    return (
      <ListItem key={item.id} item={item} />
    )
  }

  const renderList = useCallback(() => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        onEndReachedThreshold={offset < 10 ? (offset * (offset == 1 ? 2 : 2)) : 20} //While you scolling the offset number and your data number will increases.So endReached will be triggered earlier because our data will be too many
        onEndReached={getData}
      />
    )
  }, [])

  return (
    <SafeAreaView>
      {renderList()}
    </SafeAreaView>
  );
};

export default memo(ListScreen);
