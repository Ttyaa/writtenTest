axios.get('https://edu.telking.com/api/?type=month')
    .then(res => {
        var data = res.data.data;
        // 折线
        function LINE(){
        var dom = document.getElementById("echarts1");
        var myChart = echarts.init(dom);
        option = {
            title: {
                text: '曲线图数据展示',
                x: 'center',
                textStyle: {//标题文本样式
                    fontSize: 20,
                    color: '#262b2e'
                },
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#cbcbcb',
                        width: 1,
                        type: 'dotted'
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#262b2e'
                    }
                },
                data: data.xAxis
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: '{value} 人'
                },
                // 设置网格线
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#cbcbcb',
                        width: 1,
                        type: 'dotted'
                    }
                },
                //轴
                axisLine: {
                    show: false
                },
                //y轴刻度线
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#cbcbcb',
                        width: 1,
                        type: 'dotted'
                    }
                },
            }],
            series: [{
                name: 'name',
                type: 'line',
                smooth: true,
                stack: 'stack',
                color: '#528fef',
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        color: '#4587ef'
                    }
                },
                areaStyle: {
                    normal: {
                        color: '#c0dbeb' //改变折线区域颜色
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#4587ef' //改变折线颜色
                    }
                },
                data: data.series
            }]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
        }
       
    LINE();
    })
    .catch(error => {
        console.log(error);
    });

axios.get('https://edu.telking.com/api/?type=week')
    .then(res => {
        var week = res.data.data.xAxis;
        var value = res.data.data.series;
        console.log('week:',week);
        console.log('value:',value);
        let data = week.map((name,i) => ({name, value: value[i]}));

        // 饼图
        function PIE(){
            var dom = document.getElementById("echarts2");
            var myChart = echarts.init(dom);
            option = {
                title : {
                    text: '饼状图数据展示',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series : [{
                    name: '销售量',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };
            ;
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        }
        // 柱状
        function COLUMN(){
        var dom = document.getElementById("echarts3");
        var myChart = echarts.init(dom);
        option = {
            title: {
                text: '柱状图数据展示',
                x: 'center',
                textStyle: {//标题文本样式
                    fontSize: 20,
                    color: '#262b2e'
                },
            },
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: [{
                type: 'category',
                data: week,
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: '#cbcbcb',
                        width: 1,
                        type: 'dotted'
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#262b2e'
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                // 设置网格线
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#cbcbcb',
                        width: 1,
                        type: 'dotted'
                    }
                },
                //轴
                axisLine: {
                    show: false
                },
                //y轴刻度线
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#cbcbcb',
                        width: 1,
                        type: 'dotted'
                    }
                },
            }],
            series: [{
                name: 'name',
                type: 'bar',
                barWidth: '16px',
                data: value
            }]
        };
        ;
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
        }
        PIE();
        COLUMN();
    })
    .catch(error => {
        console.log(error);
    });

