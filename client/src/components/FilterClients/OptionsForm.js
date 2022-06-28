import React from "react";


class OptionsForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            allClients:[],
            clientName:" ",
            minBalance:-Infinity,
            maxBalance:Infinity,
            hasMortgage:"",
            minCC:-Infinity,
            maxCC:Infinity,
            cityOfResidency:"",
            filteredClients:[]

        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/posts')
        .then((res=>res.json()))
        .then((data=>this.setState({allClients : data})))
        
    }

    handleChange=(event)=>{
        // console.log(event.target.name)
        // console.log(event.target.value)
        if(event.target.name === "minCC" ||event.target.name === "maxCC"){
            let value = Number(event.target.value)
            this.setState({[event.target.name] : value })
        }else{
            this.setState({[event.target.name] : event.target.value })

        }
        
        
    }
    handleRadio=(event)=>{
        
        this.setState({hasMortgage: event.target.value })
        console.log(this.state.hasMortgage)
    }
   
    filterClients=()=>{
        let all = [...this.state.allClients]

        let sanitized = all.filter((element)=>{
            return element.clientName !== undefined 
        })
        // console.log(all)
        // console.log(sanitized)

            let filtered = sanitized.filter((element)=>{
               
             return  element.clientName.includes(this.state.clientName)  && Number(element.balance) >=this.state.minBalance && Number(element.balance) <=this.state.maxBalance && element.haveMortgage === this.state.hasMortgage && element.numCreditCards >=this.state.minCC //&& element.numCreditCards <=this.state.maxCC && element.city === this.state.cityOfResidency

                

            })
            console.log(filtered)
            this.setState({filteredClients:filtered})
        }




    render(){
        return(
            <div>

            
            <div className="OptionsFormComponent">
            <h1>Choose filtering options:</h1>
            <input type="text" name="clientName" placeholder="Client's name" onChange={this.handleChange} /><br />
            <input type="number" name="minBalance" placeholder="Enter min balance" onChange={this.handleChange} />
             <input type="number" name="maxBalance" placeholder="Enter max balance" onChange={this.handleChange} /><br />
            <p>Does the client has a mortgage?
            <input type="radio" id="hasMortgage" name="hasMortgage" value="No"  onClick={this.handleRadio}/><label for="yes">Yes</label>
            <input type="radio" id="hasMortgage" name="hasMortgage" value="Yes" onClick={this.handleRadio}/><label for="no">No</label>
            </p>
            <p>
                Number of credit cards:<br/>
                <input type="number" name="minCC" placeholder="Enter min Credic Cards" onChange={this.handleChange}/>
                 <input type="number" name="maxCC" placeholder="Enter max Credit cards" onChange={this.handleChange}/><br />


            </p>

            <p>City of residence:</p>
            <input list="cityOfResidency" id="cityChoice" name="cityChoice"/>
                <datalist id="cityOfResidency">
                    {this.state.allClients.map((element , index)=>{
                        return(
                            <option value={element.city} key={index}></option>
                        )
                    })}

                </datalist><br/>

                    <button onClick={this.filterClients}>Filter clients</button>
            </div>  
                    <h1>Filtered results:</h1>
                    <div className='filteredContainer'>
                        {this.state.filteredClients.map((element , index)=>{
                            return(
                                <div key={index}>
                                   <h2>{element.clientName}</h2> 
                                   <p>{element.city}</p>
                                </div>
                            )
                        })}
                           
                    </div>
            </div>

        )
    }


}


export default OptionsForm