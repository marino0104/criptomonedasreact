import React, { Component } from 'react';
import Axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error'

class Formulario extends Component {
    state={
        criptomonedas:[],
        moneda:'',
        criptomoneda:'',
        error:false

    }
    async componentWillMount(){
        const url='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
        await Axios.get(url)
        .then(respuesta=>{
            this.setState({
               criptomonedas: respuesta.data.Data
            })
        })
    }
    obtenerValor=e=>{
        const {name, value}=e.target;
        this.setState({
            [name]:value
        })
    }
    cotizarMoneda=(e)=>{
        e.preventDefault();
        // validar que haya algo en el state
        const{moneda, criptomoneda}=this.state;
        if(moneda==='' || criptomoneda===''){
            this.setState({
                error:true
            },()=>{
                setTimeout(()=>{
                    this.setState({
                        error:false
                    })
            },3000);

        })
        return;
        }
        // crear objeto
        const cotizacion={
            moneda,
            criptomoneda
        }
        // enviar datos a applicationCache.js para cotizar
        this.props.cotizarCriptomoneda(cotizacion);
    }
    render() {
        const mensaje=(this.state.error)?<Error mensaje="Ambos campos son obligatorios"/>:''
        return (
            <div>
                <form onSubmit={this.cotizarMoneda}>
                {mensaje}
                    <div className="row">
                        <label>Elige tu Moneda</label>
                        <select
                            onChange={this.obtenerValor}
                            name="moneda"
                            className="u-full-width">
                                <option value="">Elige tu moneda</option>
                                <option value="USD">Dolar Estadounidense</option>
                                <option value="MXN">Peso Mexicano</option>
                                <option value="GBP">Libras</option>
                                <option value="EUR">Euros</option>
                                <option value="COP">Peso Colombiano</option>
                        </select>
                    </div>

                    <div className="row">
                        <div>
                            <label>Elige tu Criptomoneda</label>
                            <select 
                                onChange={this.obtenerValor}
                                name="criptomoneda"
                                className="u-full-width">
                                <option value="">Elige tu criptomoneda</option>
                                {Object.keys(this.state.criptomonedas).map(key=>(
                                    <Criptomoneda
                                        key={key}
                                        criptomoneda={this.state.criptomonedas[key]}
                                    />
                                ))}
                            </select>
                        </div>
                    </div>
                    <input className="button-primary u-full-width" type="submit" value="Cotizar" />
                </form>
            </div>
        );
    }
}

export default Formulario;