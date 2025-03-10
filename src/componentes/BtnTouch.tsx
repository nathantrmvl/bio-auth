import React from "react";
import { View, Text, TouchableOpacity } from "react-native";


interface Props {
    action: () => void;
    title:  string;
    backgroundColor: string;
}

export const BtnTouch = ( { action, title, backgroundColor }: Props ) => {

    return(
        <TouchableOpacity
            onPress={ action}
        >
            <View
                style={{
                    margin: 10,
                    backgroundColor: backgroundColor,
                    borderRadius: 10,
                    width: 100,
                    height: 50,
                    justifyContent: 'center'
                }}
            >
                <Text
                    style={{
                        color: "white",
                        textAlign: "center",
                        justifyContent: "center"
                    }}
                >
                    { title }
                </Text>
            </View>
        </TouchableOpacity>
    );
}