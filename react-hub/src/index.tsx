import * as React from 'react';
import ReactEcharts from "echarts-for-react";


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
}