import * as React from 'react';
import ReactEcharts from "echarts-for-react";
import {  Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import { Typography } from "antd";
import 'moment-timezone'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Alert from '@mui/material/Alert';

import Stack from '@mui/material/Stack';
import moment from 'moment';


// Delete me
export const Thing = () => {
  return <div>coisa 1</div>;
};

export const Thing2 = (props:any) => {
  return <h2>{props.titulo}</h2>;
};


export const FieldCard = ({
  
  title = "Titulo",
  subtitle = "Subtitulo",
  children,
 
}:any) => {
  return (
   
    <Paper
      sx={{
        display: "flex" ,
        flexDirection: "column",
        justifyContent: "space-between",
        
        boxSizing: "border-box",
        
        margin: "5px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "start" }}>
       
          <Typography.Title  level={5} style={{ margin: 10 }}>{title} </Typography.Title>
          <Typography.Title  level={5} style={{ margin: 10 , fontWeight:'100',fontStyle :'italic'}}>{subtitle}</Typography.Title>
            
          
        
      </div>
      
      {children ? (
        children
      ) : (
        <CircularProgress color="success" />
        
      )}
    </Paper>
    
  );
};

export const GraphchartCard = (props:any) => {
  // const [ chartType, setChartType ] = React.useState<any>();
  // const [ gemeo,setGemeo] = React.useState<any>();
  // const [ apiAddress,setApiAddress] = React.useState<any>();
  // const [ sensores, setSensores ] = React.useState<any>();
  const [ option, setOption] = React.useState<any>({})
  const [ values , setValues ] = React.useState<any>([])
  const [ categories, setCategories ] = React.useState<any>([])
  
  React.useEffect(() => {
    // setChartType(props.chartType)
    // console.log(props.gemeo)
    // console.log(props.api_address)
    // console.log(props.sensores)
    props.sensores !== undefined && props.services.getTwinInfoById(props.gemeo).then((res:any) => {
      // console.log(res.data.api_address)
      props.services.fetchMonitoringHistoricData(res.data.api_address,
        props.sensores[0].id,
        props.sensores[0].device_id,
        2,
        'days').then((res:any) => {
          // console.log(props.sensores[0].name)
          // console.log(res)
           return res.map((data:any) => {
            // setValues((values:any) => [...values, (data.value)])
            // setCategories((categories:any) => [...categories, String(new Date(data.timestamp).getDate()).padStart(2, "0") + "/" + String(new Date(data.timestamp).getMonth() + 1).padStart(2, "0") + "/" + String(new Date(data.timestamp).getFullYear())])
            return {
              value: data.value,
              time: String(new Date(data.timestamp).getDate()).padStart(2, "0") + "/" + String(new Date(data.timestamp).getMonth() + 1).padStart(2, "0") + "/" + String(new Date(data.timestamp).getFullYear() + "-" + String(new Date(data.timestamp).getHours()).padStart(2, "0") + ":" + String(new Date(data.timestamp).getMinutes()).padStart(2, "0"))
            }
          })
        }).then ((dataFormated:any) => {
          setValues(dataFormated.map((data:any) => data.value))
          setCategories(dataFormated.map((data:any) => data.time))
        })
    })
    
    // setCategories(['01/02/2023', '02/02/2023', '03/02/2023', '04/02/2023', '05/02/2023', '06/02/2023', '07/02/2023'])
    // setValues([120, 200, 150, 80, 70, 110, 130])
    
  },[])

  
  React.useEffect(() => {

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
            // magicType: {show: true, type: ['line', 'bar','pie','gauge','candlestick','funnel']},
            // restore: {show: true},
            saveAsImage: {show: true}
        }
    },
      xAxis: {
        type: 'category',
        data: categories
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: props.chartType,
          data: values,
        }
      ]
    })

  })
  

  return (
    <FieldCard flexGrow={props.flexGrow} hidden={props.hidden} title={props.title} subtitle={props.subtitle}>
            <ReactEcharts option={option} style={{flexGrow:1,border:'',justifyContent:'stretch',alignItems:'center',display:'flex',flexDirection:'row',margin:'0px',padding:'0px'}}/>

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

export const FieldRecomendations = (props:any) => {
  const [descrição,setDescricao] = React.useState('')
  const [inicio,setInicio] = React.useState('')
  const [atualEfi,setAtualEfi] = React.useState('')
  const [tempo,setTempo] = React.useState( '')
  const [twinInterval, setTwinInterval] = React.useState([])
  
  const [gemeo,setGemeo] = React.useState('')

  React.useEffect(()=>{
    
    props.recomendations[0].sensor!==undefined && props.services.getGraphsByTwin(props.recomendations[0].sensor.digital_twin_id).then((res:any)=>{
      
      
      setTwinInterval(JSON.parse((res.data.map((option:any)=>option.y_axis_1.map((sensor:any)=>sensor.variable_type==="kpi" && sensor)).flat().filter((obj:any)  => obj.variable_type === "kpi")).pop().range))
      
    })

    
  })
  
  React.useEffect(()=>{
    props.recomendations[0].sensor !== undefined && props.services.getTwinInfoById(props.recomendations[0].sensor.digital_twin_id).then((res:any)=>{
      console.log(res)
      setGemeo(res.data.name)
      
    })
  },[])

  React.useEffect(()=>{
    props.recomendations[0].finished ? 
    setTempo('Duração: ' + moment.utc(moment(props.recomendations[0].last_alert_time).diff(moment(props.recomendations[0].first_alert_time))).format(' HH:mm:ss') + '.') :
    setTempo('Duração: ' + moment.utc(moment().diff(moment(props.recomendations[0].first_alert_time))).format(' HH:mm:ss') + '.') 
  })

  React.useEffect(()=>{
    
    setInicio(!props.recomendations[0].finished ?  'Inicio: ' + moment(props.recomendations[0].first_alert_time).format('DD/MM/YYYY HH:mm:ss') + '.': 'Fim: ' + moment(props.recomendations[0].last_alert_time).format('DD/MM/YYYY HH:mm:ss') + '.') 
    setAtualEfi('Útilmo valor: ' + parseFloat(props.recomendations[0].last_value).toFixed(2) + ' ' + props.recomendations[0].sensor.unit.abbreviation + '.')
    parseFloat(props.recomendations[0].last_value) > twinInterval[1] ? 
    props.recomendations[0].finished ? setDescricao(props.recomendations[0].sensor.name + ' ficou fora do intervalo aceitavel.') : setDescricao(props.recomendations[0].sensor.name + ' fora do intervalo aceitavel.') 
    : parseFloat(props.recomendations[0].first_value) < twinInterval[1] && setDescricao(props.recomendations[0].sensor.name + ' dentro do intervalo aceitavel.') 
  })

  return (
      <Accordion disabled={false}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{boxSizing: 'border-box',height: '50px',padding:0}}
        >
          <Alert variant={'filled'} severity={props.recomendations[0].finished? 'success':'error'} style={{display: 'flex', justifyContent: 'start', alignItems: 'center',background:'',flexGrow:1}}>
            <Typography.Title level={5} style={{backgroundColor: 'blue',fontWeight: 'bold',maxWidth: 'content',padding: '3px',borderRadius:'3px'}}>{gemeo}</Typography.Title> <Typography.arguments>{descrição} {inicio} {atualEfi} {tempo} </Typography.arguments>
          </Alert>

        </AccordionSummary>
        <AccordionDetails>
          <Stack sx={{ width: '100%' }} spacing={2}>
            {props.recomendations.length > 0 && props.recomendations.map((recomendation:any , index:number)=> {
              

const [descriçãoAccordionDetails,setDescricaoAccordionDetails] = React.useState('')
const [inicioAccordionDetails,setInicioAccordionDetails] = React.useState('')
const [atualEfiAccordionDetails,setAtualEfiAccordionDetails] = React.useState('')
const [tempoAccordionDetails,setTempoAccordionDetails] = React.useState( '')
// const [twinIntervalAccordionDetails, setTwinIntervalAccordionDetails] = React.useState([])

const [gemeoAccordionDetails,setGemeoAccordionDetails] = React.useState('')

React.useEffect(()=>{
  console.log(recomendation,index)
  setDescricaoAccordionDetails('')
  setInicioAccordionDetails('')
  setAtualEfiAccordionDetails('')
  setTempoAccordionDetails('')
  setGemeoAccordionDetails('')
},[])

// React.useEffect(()=>{
  
//   recomendation[recomendation.length-1] !==undefined && props.services.getGraphsByTwin(recomendation[recomendation.length-1].sensor.digital_twin_id).then((res:any)=>{
    
    
//     setTwinInterval(JSON.parse((res.data.map((option:any)=>option.y_axis_1.map((sensor:any)=>sensor.variable_type==="kpi" && sensor)).flat().filter((obj:any)  => obj.variable_type === "kpi")).pop().range))
    
//   })

  
// })

// React.useEffect(()=>{
//   recomendation[recomendation.length-1] !== undefined && props.services.getTwinInfoById(recomendation[recomendation.length-1].sensor.digital_twin_id).then((res:any)=>{
//     console.log(res)
//     setGemeo(res.data.name)
    
//   })
// },[])

// React.useEffect(()=>{
//   recomendation[recomendation.length-1].finished ? 
//   setTempo('Tempo decorrido:' + moment.utc(moment(recomendation[recomendation.length-1].first_alert_time).diff(recomendation[recomendation.length-1].last_alert_time)).format('DD HH mm ss') ) :
//   setTempo('Tempo decorrido:' + moment.utc(moment(recomendation[recomendation.length-1].first_alert_time).diff(moment())).format('DD HH mm ss') ) 
// })

// React.useEffect(()=>{
//   setInicio(moment.utc(recomendation[recomendation.length-1].first_alert_time).format('DD/MM/YYYY HH:mm:ss'))
//   setAtualEfi('Útilma eficiência :' + recomendation[recomendation.length-1].last_value)
//   parseInt(recomendation[recomendation.length-1].last_value) > twinInterval[1] ? 
//   recomendation[recomendation.length-1].finished ? setDescricao('Eficiência do consumo de Gás Natural ficou fora do intervalo aceitavel') : setDescricao('Eficiência do consumo de Gás Natural fora do intervalo aceitavel') 
//   : parseInt(recomendation[recomendation.length-1].first_value) < twinInterval[1] && setDescricao('Eficiência do consumo de Gás Natural dentro do intervalo aceitavel') 
// })
              
              return (
              index !== recomendation.length -1 && 
              <Alert variant={'filled'} severity={true ? 'success':'error'} style={{display: 'flex', justifyContent: 'start', alignItems: 'center',background:'',flexGrow:1}}>
            { gemeoAccordionDetails } {descriçãoAccordionDetails} {inicioAccordionDetails} {atualEfiAccordionDetails} {tempoAccordionDetails} 
          </Alert>
              );
            }).splice(0,6).reverse()}
            
          </Stack>
        </AccordionDetails>
      </Accordion>
    
  );
};


