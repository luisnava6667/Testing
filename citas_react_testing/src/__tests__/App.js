import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('<App /> Agregar una cita y verificar el Heading', () => {
   // const wrapper = render(<App />);
   // wrapper.debug();
   render(<App />);
   expect(screen.getByText('Administrador de Pacientes')).toBeInTheDocument();
   expect(screen.getByTestId('nombre-app').textContent).toBe(
      'Administrador de Pacientes'
   );
   expect(screen.getByText('Crear Cita')).toBeInTheDocument();
   expect(screen.getByText('No hay citas')).toBeInTheDocument();
});

test('<App /> La aplicacion funciona bien la primera vez', () => {
   render(<App />);
   //llenar formulario
   userEvent.type(screen.getByTestId('mascota'), 'Hook');
   userEvent.type(screen.getByTestId('propietario'), 'Luis');
   userEvent.type(screen.getByTestId('fecha'), '2022-12-30');
   userEvent.type(screen.getByTestId('hora'), '10:30');
   userEvent.type(screen.getByTestId('sintomas'), 'Solo duerme');
   //click en el boton submit
   const btnSubmit = screen.getByTestId('btn-submit');
   userEvent.click(btnSubmit);
   //Revisar por alerta
   const alerta = screen.queryByTestId('alerta');
   expect(alerta).not.toBeInTheDocument();

   //revisar por el titulo dinamico
   expect(screen.getByTestId('titulo-dinamico').textContent).toBe(
      'Administra tus Citas'
   );
   expect(screen.getByTestId('titulo-dinamico').textContent).not.toBe(
      'no hay citas'
   );
});

test('<App /> Verificar las citas en el DOM', async () => {
   render(<App />);
   const citas = await screen.findAllByTestId('cita');
   //    console.log(citas.toString());
   //Snapshot crea un archivo para verificar su contenido
   //    expect(citas).toMatchSnapshot();
   expect(screen.getByTestId('boton-eliminar').tagName).toBe('BUTTON');
   expect(screen.getByTestId('boton-eliminar')).toBeInTheDocument();
   //Verificar alguna Cita
   expect(screen.getByText('Hook')).toBeInTheDocument();
});
test('<App /> Elimina la Cita', () => {
   render(<App />);
   const btnEliminar = screen.getByTestId('boton-eliminar');
   expect(btnEliminar.tagName).toBe('BUTTON');
   expect(btnEliminar).toBeInTheDocument();
   //simular el click
   userEvent.click(btnEliminar);
   //el boton no debe estar
   expect(btnEliminar).not.toBeInTheDocument();
   //la cita no debe estar
   expect(screen.queryByText('Hook')).not.toBeInTheDocument();
   expect(screen.queryByTestId('cita')).not.toBeInTheDocument();
});
