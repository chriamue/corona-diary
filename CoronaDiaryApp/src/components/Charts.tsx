import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import Connection from '../Connection';
import Connections from '../Connections';
import ConnectionStats from '../ConnectionStats';


interface Props {
    connections: Connections
}
interface State {

}

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity==undefined?0:opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
};

export default class Charts extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            nearbyAPI: null,
            nearbyConnected: false
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const { connections } = this.props;
        if (!connections) {
            return null;
        }
        const connectionStats = new ConnectionStats(connections);
        return (
            <View>
                <ContributionGraph
                    values={connectionStats.getCommits()}
                    endDate={new Date()}
                    numDays={14}
                    width={Dimensions.get("window").width}
                    height={220}
                    chartConfig={chartConfig}
                />
            </View>
        )
    }
}
