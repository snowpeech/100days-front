import { ResponsiveLine } from '@nivo/line'

const LineGraph = ({data}) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 5, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: '0', max: '10', stacked: false, reverse: false }}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 7,
            tickRotation: 0,
            legend: 'Day',
            legendOffset: 36, 
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 1,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Score',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'set2' }}
        isInteractive={false}
        enableGridX={false}
        gridYValues={[0,2,4,6,8,10]}
        pointSize={6}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                justify: false,
                translateX: -10,
                translateY: -215,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 90,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

export default LineGraph;