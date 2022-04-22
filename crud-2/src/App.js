import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap'


const data=[
  {id: 1, personaje: "naruto", anime: "Naruto"},
  {id: 2, personaje: "Goku", anime: "Dragon ball"},
  {id: 3, personaje: "Kenshin himura", anime: "rurouni Kenshin"},
  {id: 4, personaje: "Monkey D. Luffy", anime: "One Piece"},
  {id: 5, personaje: "Edward Elric", anime: "Full metal Alchemist: Brotherhood"},
  {id: 6, personaje: "Seto Kaiba", anime: "Yu-Gi_oh"},
] 

class App extends React.Component {

  state={
    data: data,
    form: {
      id:'', 
      personaje:'',
      anime:''
    },

    modalInsertar:false,
    modalEditar:false
  }

  /* Logica para el modal de insertar */
  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  }
  mostrarModalInsertar=()=>{
    this.setState({modalInsertar:true})
  }
  ocultarModalInsertar=()=>{
    this.setState({modalInsertar:false})
  }


 mostrarModalEditar=(registro)=>{
    this.setState({modalEditar:true, form: registro})
  }

  ocultarModalEditar=()=>{
    this.setState({modalEditar:false})
  }

  insertar=()=>{
    var valorNuevo={...this.state.form}
    valorNuevo.id=this.state.data.length+1;
    var lista=this.state.data
    lista.push(valorNuevo)
    this.setState({data: lista, modalInsertar: false})

  }
  /* Logica para el modal de insertar */


  /* editar */

  editar=(dato)=>{
    var contador = 0
    var lista=this.state.data
    lista.map((registro)=>{
      if(dato.id==registro.id){
        lista[contador].personaje=dato.personaje;
        lista[contador].anime=dato.anime;
      }
      contador++;
    });
    this.setState({data: lista, modalEditar: false})

  }

  
  /* editar */

  /* Eliminar */

  eliminar=(dato)=>{
    var opcion=window.confirm("¿Realmente desea eliminar el resgitro?" + " " + dato.id);
    if(opcion){
      var contador=0
      var lista = this.state.data;
      lista.map((registro)=>{
        if(registro.id==dato.id){
        lista.splice(contador, 1)
        }
        contador++
      })
      this.setState({data: lista})
    }
  }



  render (){
    return (
      <>
      <Container>

      
      <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar nuevo personaje</Button>
      <br/>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Personaje</th>
            <th>Anime</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
            {this.state.data.map((elemento)=>(
              <tr>
                <td>{elemento.id}</td>
                <td>{elemento.personaje}</td>
                <td>{elemento.anime}</td>
                <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{" "}
                    <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
      </Table>
      </Container>


      
      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar registro</h3>
            </div></ModalHeader>
      <ModalBody>
        <FormGroup>
          <label>Id:</label>
          <input className="form-control" readOnly type="text" value={this.state.data.length+1}></input>
        </FormGroup>

        <FormGroup>
          <label>Personaje:</label>
          <input className="form-control" name="personaje" type="text" onChange={this.handleChange}></input>
        </FormGroup>

        <FormGroup>
          <label>Anime:</label>
          <input className="form-control" name="anime" type="text" onChange={this.handleChange}></input>
        </FormGroup>
        <ModalFooter>
          <Button color="primary" onClick={()=>this.insertar()}>Insertar</Button>
          <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
      </ModalBody>
      </Modal>


      <Modal isOpen={this.state.modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar registro</h3>
            </div></ModalHeader>
      <ModalBody>
        <FormGroup>
          <label>Id:</label>
          <input className="form-control" readOnly type="text" value={this.state.form.id}></input>
        </FormGroup>

        <FormGroup>
          <label>Personaje:</label>
          <input className="form-control" name="personaje" type="text" onChange={this.handleChange} value={this.state.form.personaje}></input>
        </FormGroup>

        <FormGroup>
          <label>Anime:</label>
          <input className="form-control" name="anime" type="text" onChange={this.handleChange} value={this.state.form.anime}></input>
        </FormGroup>
        <ModalFooter>
          <Button color="primary" onClick={()=>this.editar(this.state.form)}>Editar</Button>
          <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
          </ModalFooter>
      </ModalBody>
      </Modal>
    
      </>


    );

  }
 
}

export default App;
