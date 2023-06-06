import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import Header from '../../layout/Header';
import ProductItem from '../../components/ProductItem';
import pic1 from '../../assets/images/product/pic1.jpg';
import pic2 from '../../assets/images/product/pic2.jpg';
import pic3 from '../../assets/images/product/pic3.jpg';
import pic4 from '../../assets/images/product/pic4.jpg';
import pic5 from '../../assets/images/product/pic5.jpg';
import pic6 from '../../assets/images/product/pic6.jpg';
import pic7 from '../../assets/images/product/pic7.jpg';
import pic8 from '../../assets/images/product/pic8.jpg';
import {List, RadioButton, Snackbar} from 'react-native-paper';
import Ripple from 'react-native-material-ripple';
import CheckBox from '@react-native-community/checkbox';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import CustomButton from '../../components/CustomButton';

import {useEffect} from 'react';
import {useGetProductsQuery} from '../../../store/services/products';

const discountFilterData = [
  {
    selected: false,
    title: '50% or more',
  },
  {
    selected: false,
    title: '30% or more',
  },
  {
    selected: false,
    title: '40% or more',
  },
  {
    selected: false,
    title: '60% or more',
  },
  {
    selected: false,
    title: '70% or more',
  },
];
const brandFilterData = [
  {
    selected: true,
    title: 'Roadster',
  },
  {
    selected: true,
    title: 'Peter England',
  },
  {
    selected: true,
    title: 'Flying Machine',
  },
  {
    selected: true,
    title: 'Killer',
  },
  {
    selected: true,
    title: "Levi's",
  },
  {
    selected: true,
    title: 'Puma',
  },
  {
    selected: true,
    title: 'Wildcraft',
  },
  {
    selected: true,
    title: 'Ndet',
  },
  {
    selected: true,
    title: 'Woodland',
  },
];

const Items = ({navigation, route}) => {
  const sheetRef = useRef();

  const {type, subCategoriesId} = route.params;

  const {data, isLoading, isSuccess, isError} = useGetProductsQuery({
    subCategory: subCategoriesId,
  });

  const [itemData, setItemData] = useState([]);

  const [sortVal, setSortVal] = useState('');
  const [sheetType, setSheetType] = useState('');
  const [brandFilter, setBrandFilter] = useState(brandFilterData);
  const [discountFilter, setDiscountFilter] = useState(discountFilterData);
  const [filterData, setFilterData] = useState([]);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackText, setSnackText] = useState('Loading...');

  useEffect(() => {
    if (isSuccess) {
      setItemData(data?.data);
    }
    console.log(data?.data);
  }, [isSuccess]);

  const handleItemLike = val => {
    let items = itemData.map(data => {
      if (val === data.id) {
        if (data.isLike) {
          setSnackText('Item removed to Favourite.');
        } else {
          setSnackText('Item add to Favourite.');
        }
        setIsSnackbar(true);
        return {...data, isLike: !data.isLike};
      }
      return data;
    });
    setItemData(items);
  };

  const handleFilterSelected = val => {
    let Brand = brandFilter.map(data => {
      if (val === data.title) {
        return {...data, selected: !data.selected};
      }
      return data;
    });
    let Discount = discountFilter.map(data => {
      if (val === data.title) {
        return {...data, selected: !data.selected};
      }
      return data;
    });
    setBrandFilter(Brand);
    setDiscountFilter(Discount);
    setFilterData(
      sheetType == 'brand' ? Brand : sheetType == 'discount' ? Discount : [],
    );
  };

  useEffect(() => {
    navigation.setOptions({title: type});
  }, []);

  return (
    <>
      <RBSheet
        ref={sheetRef}
        height={
          sheetType === 'sort'
            ? 250
            : sheetType === 'discount'
            ? 310
            : sheetType === 'brand'
            ? 400
            : 300
        }
        closeOnDragDown={true}
        closeOnPressMask={true}>
        {sheetType == 'sort' ? (
          <RadioButton.Group
            onValueChange={value => {
              setSortVal(value);
              sheetRef.current.close();
            }}
            value={sortVal}>
            <RadioButton.Item
              color={COLORS.primary}
              uncheckedColor={COLORS.label}
              style={{paddingVertical: 2}}
              label="What's new"
              value="newest"
            />
            <RadioButton.Item
              color={COLORS.primary}
              uncheckedColor={COLORS.label}
              style={{paddingVertical: 2}}
              label="Price - high to low"
              value="price-hightolow"
            />
            <RadioButton.Item
              color={COLORS.primary}
              uncheckedColor={COLORS.label}
              style={{paddingVertical: 2}}
              label="Price - low to hight"
              value="price-lowtohigh"
            />
            <RadioButton.Item
              color={COLORS.primary}
              uncheckedColor={COLORS.label}
              style={{paddingVertical: 2}}
              label="Popularity"
              value="popularity"
            />
            <RadioButton.Item
              color={COLORS.primary}
              uncheckedColor={COLORS.label}
              style={{paddingVertical: 2}}
              label="Discount"
              value="discount"
            />
          </RadioButton.Group>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 5,
                marginTop: -10,
                marginBottom: 5,
              }}>
              <TouchableOpacity
                onPress={() => sheetRef.current.close()}
                style={{
                  padding: 10,
                  marginRight: 3,
                }}>
                <FeatherIcon color={COLORS.title} size={24} name="x" />
              </TouchableOpacity>
              <Text style={{...FONTS.h6, top: 1}}>Filters</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {filterData.map((data, index) => (
                <View
                  key={index}
                  style={{
                    width: '50%',
                  }}>
                  <List.Item
                    style={{paddingVertical: 2}}
                    onPress={() => handleFilterSelected(data.title)}
                    left={() => (
                      <CheckBox
                        tintColors={{true: COLORS.primary, false: COLORS.text}}
                        style={{left: 10}}
                        value={data.selected}
                        disabled
                      />
                    )}
                    title={() => (
                      <Text
                        style={{
                          ...FONTS.font,
                          ...FONTS.fontMedium,
                          top: -1,
                          color: COLORS.title,
                        }}>
                        {data.title}
                      </Text>
                    )}
                  />
                </View>
              ))}
            </View>
            <View style={GlobalStyleSheet.container}>
              <View style={GlobalStyleSheet.row}>
                <View style={GlobalStyleSheet.col50}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: COLORS.borderColor,
                      paddingHorizontal: 15,
                      alignItems: 'center',
                      paddingVertical: 14,
                      borderRadius: SIZES.radius,
                    }}>
                    <Text style={{...FONTS.fontLg, color: COLORS.primary}}>
                      Clear
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={GlobalStyleSheet.col50}>
                  <CustomButton title={'Apply'} />
                </View>
              </View>
            </View>
          </>
        )}
      </RBSheet>

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.backgroundColor,
        }}>
        {/* Filter */}
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ripple
                onPress={() => {
                  setSheetType('sort');
                  sheetRef.current.open();
                }}
                style={styles.badge}>
                {/* <Octicons size={16} style={{marginRight: 6}} name="sort-desc" /> */}
                <Text style={{...FONTS.font, top: -1, color: COLORS.title}}>
                  Sort
                </Text>
                <FeatherIcon
                  style={{marginLeft: 2, marginRight: -6}}
                  size={18}
                  name="chevron-down"
                />
              </Ripple>
              <TouchableOpacity
                onPress={() => navigation.navigate('Filter')}
                style={styles.badge}>
                {/* <FeatherIcon style={{marginRight: 8}} size={15} name="filter" /> */}
                <Text style={{...FONTS.font, top: -1, color: COLORS.title}}>
                  Filter
                </Text>
              </TouchableOpacity>
              <Ripple
                onPress={() => {
                  setSheetType('brand');
                  setFilterData(brandFilter);
                  sheetRef.current.open();
                }}
                style={styles.badge}>
                <Text style={{...FONTS.font, top: -1, color: COLORS.title}}>
                  Brand
                </Text>
                <FeatherIcon
                  style={{marginLeft: 2, marginRight: -6}}
                  size={18}
                  name="chevron-down"
                />
              </Ripple>
              <Ripple
                onPress={() => {
                  setSheetType('discount');
                  setFilterData(discountFilter);
                  sheetRef.current.open();
                }}
                style={styles.badge}>
                <Text style={{...FONTS.font, top: -1, color: COLORS.title}}>
                  Discount
                </Text>
                <FeatherIcon
                  style={{marginLeft: 2, marginRight: -6}}
                  size={18}
                  name="chevron-down"
                />
              </Ripple>
            </View>
          </ScrollView>
        </View>
        {/* Products */}
        <ScrollView>
          <View
            style={{
              paddingTop: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingHorizontal: 5,
              }}>
              {itemData.map((item, index) => (
                <View key={index} style={{width: '50%', paddingHorizontal: 5}}>
                  <ProductItem
                    onPress={() =>
                      navigation.navigate('ProductDetail', {
                        product: item._id,
                      })
                    }
                    imgLength={type == 'Fashion'}
                    id={item._id}
                    // imageSrc={item.image}
                    title={item.name}
                    status={item.status}
                    price={item.price}
                    oldPrice={item.oldPrice}
                    // isLike={data.isLike}
                    handleItemLike={handleItemLike}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* SnackBar */}
        <Snackbar
          visible={isSnackbar}
          duration={3000}
          onDismiss={() => setIsSnackbar(false)}
          action={{
            label: 'Wishlist',
            onPress: () => {
              navigation.navigate('Wishlist');
            },
          }}>
          {snackText}
        </Snackbar>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  badge: {
    // borderWidth: 1,
    // borderColor: COLORS.borderColor,
    // backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Items;
