import {Pressable, StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {globalColors} from "@/shared/styles";

type ItemProps = {
    item: any,
    onPress: Function
}

const Item = (props: ItemProps) => {
    const {item} = props
    return <Pressable onPress={() => props.onPress(item.id)}><View style={styles.itemWrapper}>
        <Text style={styles.title} key={item.id}>{item.diaDiemHienMau}</Text>
        <Text style={styles.subtitle}>{item.ngayHienMau}</Text>
    </View></Pressable>
}

const styles = StyleSheet.create({
    itemWrapper: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: globalColors.gray['200']
    },
    title: {
        fontWeight: "500"
    },
    subtitle: {
        marginTop: 5,
        fontSize: 13,
        color: globalColors.gray['500']
    }
});


export default Item;
