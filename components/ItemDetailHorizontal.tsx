import {StyleSheet, View} from "react-native";
import {globalColors} from "@/shared/styles";
import {Text} from "react-native-paper";


type ItemDetailProps = {
    title: string,
    value: string
}
const ItemDetail = (props: ItemDetailProps) => {
    return <View style={styles.itemWrapper}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.value}</Text>
    </View>
}


const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: globalColors.gray['200']
    },
    title: {
        fontWeight: "500",
        marginRight: 20,
    },
    subtitle: {
        fontSize: 13,
        color: globalColors.gray['500'],
        flexWrap: "wrap",
        flexShrink: 1,
        textAlign: "right",
    }
});

export default ItemDetail