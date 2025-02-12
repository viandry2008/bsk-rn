import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const onboardingData = [
    {
        id: "1",
        title: "Welcome to Our App",
        description: "This is a sample onboarding screen in React Native.",
        image: require('../../assets/images/onboard/img_intro_1.png')
    },
    {
        id: "2",
        title: "Easy to Use",
        description: "Our app is simple and user-friendly.",
        image: require('../../assets/images/onboard/img_intro_2.png')
    },
    {
        id: "3",
        title: "Get Started Now",
        description: "Sign up and start exploring today!",
        image: require('../../assets/images/onboard/img_intro_3.png')
    }
];

const Onboard: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = React.useRef<FlatList>(null);

    const handleNext = () => {
        if (currentIndex < onboardingData.length - 1) {
            setCurrentIndex(currentIndex + 1);
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={onboardingData}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const index = Math.floor(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
                renderItem={({ item }) => (
                    <View style={styles.page}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                )}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {/* Indicator */}
                <View style={styles.indicatorContainer}>
                    {onboardingData.map((_, index) => (
                        <View key={index} style={[styles.indicator, currentIndex === index && styles.activeIndicator]} />
                    ))}
                </View>

                {/* Next Button */}
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    page: { width, alignItems: "center", justifyContent: "center" },
    image: { width: 300, height: 300, resizeMode: "contain" },
    title: { fontSize: 24, fontWeight: "bold", marginTop: 20 },
    description: { fontSize: 16, textAlign: "center", marginHorizontal: 20, marginTop: 10 },
    indicatorContainer: { flexDirection: "row", marginTop: 20 },
    indicator: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#ccc", marginHorizontal: 5 },
    activeIndicator: { backgroundColor: "#000" },
    nextButton: { marginTop: 20, backgroundColor: "#000", paddingVertical: 10, paddingHorizontal: 40, borderRadius: 5 },
    nextButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" }
});

export default Onboard;
