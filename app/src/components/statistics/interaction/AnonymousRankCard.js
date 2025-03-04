import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const AnonymousRankCard = (props) => {

    const [items, setItems] = useState([]);
    const [maxValue, setMaxValue] = useState(0);

    useEffect(() => {
        getData();
    }, [props.tagLogArr]);

    const getData = () => {
        let itemTemp = [];
        props.tagLogArr.map((tag) => (
            itemTemp.push({ value: tag.count, label: tag._id })
        ))
        console.log(itemTemp);

        let countTemp = [];
        props.tagLogArr.map((tag) => (
            countTemp.push(tag.count)
        ))
        countTemp = Math.max.apply(null, countTemp);
        console.log(countTemp);

        setItems(itemTemp);
        setMaxValue(countTemp);
    }

    return (
        <>
            {
                props.tagLogArr.length==0 
                ?
                <View>
                    <Text>Loading...</Text>
                </View>
                :
                <BarChart
                    frontColor={'#91d653'}
                    barBorderRadius={4}
                    data={items}
                    height={120}
                    width={280}
                    maxValue={maxValue} //MaxValue = noOfSections여야함
                    noOfSections={5}
                />
            }

            {/* {props.tagLogArr && props.tagLogArr.slice(0, 5).map((tag) => (
                <Text key={tag._id}>{tag._id}{tag.count}</Text>
            ))} */}
        </>
    )
}

export default AnonymousRankCard;