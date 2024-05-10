import { Text, View, StyleSheet } from "react-native";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";
  

const PinInput = ({ value, setValue, cellCount, backgroundColor }) => {
    const ref = useBlurOnFulfill({ value, cellCount: 4 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    return (
        <View style={styles.container}>
           <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={cellCount}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                <Text
                    key={index}
                    style={[styles.cell, {backgroundColor}, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}
                >
                    {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    codeFieldRoot: {
        marginTop: 30,
    },
    cell: {
        width: 60,
        height: 60,
        lineHeight: 30,
        fontSize: 24,
        borderWidth: 1,
        borderColor: "#D3D3D3",
        borderRadius: 8,
        textAlign: "center",
        textAlignVertical: "center",
    },
    focusCell: {
        borderColor: "#6500E0",
    },
})

export default PinInput;