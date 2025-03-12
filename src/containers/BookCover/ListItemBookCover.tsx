import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import TextComp from '../../components/TextComp';
import Colors from '../../styles/colors';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 3;
const ITEM_HEIGHT = 210;

type Props = {
  item: any;
  index: number;
  onPress: Function;
  isFav?: any;
};

const ListItemBookCover = ({item, index, onPress, isFav}: Props) => {
  return (
    <TouchableOpacity
      key={index}
      onPress={() => onPress(item)}
      style={[styles.container, {width: ITEM_WIDTH}]}>
      {/* Gambar Buku */}
      <View>
        {item?.resources?.map((res: any) => {
          if (res?.rel == 'cover') {
            return (
              <Image
                source={{uri: res?.href}}
                style={[styles.image, {width: ITEM_WIDTH, height: ITEM_HEIGHT}]}
              />
            );
          }
        })}

        {isFav == true ? (
          <View style={styles.favoriteIcon}>
            <Icon name="heart" size={16} color={Colors.white} />
          </View>
        ) : null}
      </View>

      {/* Konten Buku */}
      <View style={styles.content}>
        <TextComp
          type="semibold"
          color={Colors.gray1}
          size={14}
          value={item?.metadata?.title}
          numberOfLines={2}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ListItemBookCover;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginHorizontal: 8,
    marginVertical: 8,
    alignItems: 'center',
    position: 'relative', // Menjadikan posisi relatif untuk menempatkan icon love
  },
  image: {
    borderRadius: 16,
  },
  content: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  favoriteIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    // borderRadius: 8,
    padding: 8,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
});
