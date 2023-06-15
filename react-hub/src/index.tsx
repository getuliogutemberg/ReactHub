import * as React from 'react';
import ReactEcharts from "echarts-for-react";
import {  Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import { Typography } from "antd";

// Delete me
export const Thing = () => {
  return <div>coisa 1</div>;
};

export const Thing2 = (props:any) => {
  return <h2>{props.titulo}</h2>;
};


export const FieldCard = ({
  flexGrow,
  title = "Titulo",
  subtitle = "Subtitulo",
  children,
  hidden = false,
}:any) => {
  return (
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "space-between",
    //     // background: "blue",
    //     width: "30vw",
    //     minWidth: "400px",
    //     height: "29.5vh",
    //     minHeight: "200px",
    //     boxSizing: "border-box",
    //     flexGrow: { flexGrow },
    //     margin: "5px",
    //   }}
    // >
    <Paper
      sx={{
        display: !hidden ? "flex" : "none",
        flexDirection: "column",
        justifyContent: "space-between",
        
        minWidth: "250px",

        minHeight: "50px",
        boxSizing: "border-box",
        flexGrow: flexGrow,
        margin: "5px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "start" }}>
       
          <Typography.Title  level={5} style={{ margin: 10 }}>{title} </Typography.Title>
          <Typography.Title  level={5} style={{ margin: 10 , fontWeight:'100',fontStyle :'italic'}}>{subtitle}</Typography.Title>
            
          
        
      </div>
      {/* <img
          src="/logo512.png"
          alt="Imagem"
          style={{
            height: "calc(100% - 56px)",
            background: "red",
            padding: "5px",
            width: "100%",
          }}
        /> */}
      {children ? (
        children
      ) : (
        
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100% - 50px)",
            // background: "red",
            padding: "5px",
            // width: "29vw",
            // minWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <CircularProgress color="success" />
        </div>
      )}
    </Paper>
    // {/* </div> */}
  );
};

export const GraphchartCard = (props:any) => {
  // const [ chartType, setChartType ] = React.useState<any>();
  const [ gemeo,setGemeo] = React.useState<any>();
  const [ apiAddress,setApiAddress] = React.useState<any>();
  const [ sensores, setSensores ] = React.useState<any>();
  const [ option, setOption] = React.useState<any>({})

  React.useEffect(() => {
    console.log(gemeo,apiAddress,sensores);
  },[]);
  
  React.useEffect(() => {
    // setChartType(props.chartType)
    setGemeo(props.gemeo)
    setApiAddress(props.api_address)
    setSensores(props.sensores)
    setOption({
      tooltip: {
        
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
      grid: {
        top: 50,
        left: 50,
        right: 50,
        bottom: 30,
        // height: '100vh',
      },
      toolbox: {
        
        feature: {
            // dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar','pie','gauge','candlestick','funnel']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    })
    }
      ,[])

  

  return (
    <FieldCard flexGrow={props.flexGrow} hidden={props.hidden} title={props.title} subtitle={props.subtitle}>
            <ReactEcharts option={option} style={{flexGrow:1,border:'',justifyContent:'stretch',alignItems:'center',display:'flex',flexDirection:'column',margin:'0px',padding:'0px'}}/>

    </FieldCard>
    
  );
};

export const ClientCard = (props:any) => {

  return <Link
                key={props.id}
                color="black"
                to={"/setTwin"}
                onClick={()=>{localStorage.setItem('client_id',props.id)}}
                style={{ margin: "10px", textDecoration: "none", color: "white",background: "" ,display:'flex',justifyContent:'center',alignItems:'start',maxHeight:"250px",maxWidth:'250px', cursor: "pointer",}}
              > <Paper style={{
                minHeight: "200px",
                maxHeight: "200px",
                width: "270px", 
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-between',
                // padding:'10px'
                }}>
                
                   <Typography.Title  level={5} style={{ margin: 10 }}>{props.name}</Typography.Title >
                    <img
                    src={props.logo}
                    alt={props.name}
                    className="Logo"
                    loading="lazy"
                    style={{width: "230px", maxHeight: "140px",margin:'auto'}}
                    
                    
                    />
                    
                    </Paper></Link>
};

export const TwinCard = (props:any) => {
  const [sensorKpi ,setSensorKpi] = React.useState<any>([]);
  const [value, setValue] = React.useState(0);
  const [twinInterval, setTwinInterval] = React.useState([0, 0]);

  const option = {
    

    grid:{
      
    },
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max:
          parseFloat(
            twinInterval[1] < 1 ? twinInterval[1].toFixed(2) : twinInterval[1].toFixed(0)
          ) * 1.5,
        splitNumber: 3,
        animationDuration: 1000,
        axisLine: {
          lineStyle: {
            width: 10,

            color: [
              [2/3, "rgba(131, 171, 81, 1)"],
              [1, "rgba(192, 64, 64, 1)"],
            ],
          },
        },
        pointer: {
          length: "40%",
          width: value === 0 ? 0 : 5,
          itemStyle: {
            color: "black",
          },
          offsetCenter: [0, "-60%"],
        },
        axisTick: {
          length: -5,
          lineStyle: {
            color: "#000",
            width: 0.5,
          },
        },
        splitLine: {
          length: -55,

          lineStyle: {
            color: "#000",
            width: 0,
          },
          color: "#000",
        },
        title: {
          offsetCenter: [0, "10%"],
          fontSize: 20,
        },
        detail: {
          fontSize: 40,
          offsetCenter: [0, "-20%"],
          valueAnimation: true,
          formatter: function (value: number) {
            if (value > 99) {
              return `${value.toFixed(0)}`;
            }
            if (value < 1 && value > 0) {
              return `${value.toFixed(3)}`;
            }
            if (!value) {
              return `${"0"}`;
            }

            return `${value.toFixed(2)}`;
          },
          color: "#000",
        },
        data: [
          {
            value: value,
            name: sensorKpi ? sensorKpi.unit?.abbreviation : null,
            interval: twinInterval,
          },
        ],
      },
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 60,
        min: 0,
        max: parseFloat(
          twinInterval[1] < 1 ? twinInterval[1].toFixed(2) : twinInterval[1].toFixed(0)
        ),

        itemStyle: {
          color: "rgba(131, 171, 81, 0.7)",
        },
        progress: {
          show: true,
          width: value === 0 ? 0 : 25,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: value,
          },
        ],
      },
      {
        type: "gauge",
        startAngle: 60,
        endAngle: 0,
        min: parseFloat(
          twinInterval[1] < 1 ? twinInterval[1].toFixed(2) : twinInterval[1].toFixed(0)
        ),
        max:
          parseFloat(
            twinInterval[1] < 1 ? twinInterval[1].toFixed(2) : twinInterval[1].toFixed(0)
          ) * 1.5,
        itemStyle: {
          color: "rgba(192, 64, 64, 0.7)",
        },
        progress: {
          show: true,
          width: value === 0 ? 0 : 25,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        detail: {
          show: false,
        },
        title: {
          offsetCenter: [0, "50%"],
          fontSize: 15,
        },
        data: [
          {
            value: value,
            name: sensorKpi ? (`Intervalo de referencia: \n ${twinInterval[0].toFixed(2)} - ${twinInterval[1].toFixed(2)}`):(`Kpi \n não encontrado`),
          },
        ],
      },
    ],
  };
  
  React.useEffect(()=>{
                  const id = props.id
                  props.services.getGraphsByTwin(id).then((res:any)=>{
                    
                    setSensorKpi((res.data.map((option:any)=>option.y_axis_1.map((sensor:any)=>sensor.variable_type==="kpi" && sensor)).flat().filter((obj:any) => obj.variable_type === "kpi")).pop())
                    setTwinInterval(JSON.parse((res.data.map((option:any)=>option.y_axis_1.map((sensor:any)=>sensor.variable_type==="kpi" && sensor)).flat().filter((obj:any)  => obj.variable_type === "kpi")).pop().range))
                    props.services.fetchMonitoringHistoricData(
                      props.api_address,
                      JSON.parse((res.data.map((option:any)=>option.y_axis_1.map((sensor:any)=>sensor.variable_type==="kpi" && sensor)).flat().filter((obj:any)  => obj.variable_type === "kpi")).pop().number),
                      ((res.data.map((option:any)=>option.y_axis_1.map((sensor:any)=>sensor.variable_type==="kpi" && sensor)).flat().filter((obj:any)  => obj.variable_type === "kpi")).pop().device_id),
                      1,
                      "days"
                    ).then((res:any)=>{
                      setValue(res[res.length-1].value)
                    })
                  })

                  
                },[])

                

                return <Link
                key={props.id}
                color="black"
                to={'/monitoring'}
                onClick={()=>{localStorage.setItem('twin_id',props.id)}}
                style={{ margin: "10px", textDecoration: "none", color: "white",background: "" ,display:'flex',justifyContent:'center',alignItems:'start',maxHeight:"250px",maxWidth:'250px', cursor: "pointer",}}
              > 
                <Paper  style={{
                    height: "250px",
                    width: "270px", 
                    // padding:'10px'
                    }} >
              
                    
    
                    <Typography.Title  level={5} style={{ margin: 10 }}>{props.name}</Typography.Title>
                    <ReactEcharts option={option}  style={{height: '100%', width: '100%' ,opacity:sensorKpi ? 1 : 0.3 }}/>
                    
                    
                 
                </Paper>
              </Link>
};