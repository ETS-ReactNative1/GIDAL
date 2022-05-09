import { Text, View } from "react-native"
import TagRankCard from "../../components/statistics/TagRankCard";


const PersonalStatisticsView = (props) => {
    // 여기에서 조회 데이터를 받은 다음, 아래 TagRankCard에 값을 줘서 렌더링 할 것임
    const data = {
        type:"private",
        title:"개별 통계",
    }

    return(
        <View>
            <TagRankCard data={data}/>
        </View>
    )
}

export default PersonalStatisticsView;