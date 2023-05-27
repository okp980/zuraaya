import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ShopItem from '../../components/ShopItem';
import {COLORS, FONTS} from '../../constants/theme';
import {GlobalStyleSheet} from '../../constants/StyleSheet';

const Collections = ({products, title, subtitle, ishorinzontal = true}) => {
  const handleLike2 = id => {
    // let temp = products.map((data, index) => {
    //   if (id === data.id) {
    //     return {...data, isLike: !data.isLike};
    //   }
    //   return data;
    // });
    // setProductsData2(temp);
  };
  return (
    <View style={{marginTop: 10, paddingHorizontal: 10}}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
        }}>
        <View style={{flex: 1}}>
          {title && (
            <Text
              style={{
                ...FONTS.font,
                color: COLORS.dark,
                textTransform: 'uppercase',
              }}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              style={{
                ...FONTS.font,
                color: COLORS.dark,
                textTransform: 'capitalize',
              }}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <FlatList
        ItemSeparatorComponent={<View style={{width: 5}} />}
        horizontal={ishorinzontal}
        showsHorizontalScrollIndicator={false}
        data={products}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ShopItem item={item} handleLike={handleLike2} />
        )}
        numColumns={!ishorinzontal ? 2 : undefined}
      />
    </View>
  );
};

export default Collections;

const styles = StyleSheet.create({});
