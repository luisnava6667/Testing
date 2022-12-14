import React from 'react';
import { render, screen } from '@testing-library/react';
import Formulario from '../components/Formulario';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
const crearCita = jest.fn();

test('<Formulario /> cargar el formulario y revisar que todo sea correcto', () => {
   //    const wrapper = render(<Formulario />);
   //    wrapper.debug();
   render(<Formulario crearCita={crearCita} />);
   //heading
   const titulo = screen.getByTestId('titulo');
   expect(screen.getByText('Crear Cita')).toBeInTheDocument();
   expect(titulo).toBeInTheDocument();
   expect(titulo.tagName).toBe('H2');
   expect(titulo.tagName).not.toBe('H1');
   expect(titulo.textContent).toBe('Crear Cita');
   //Boton de submit
   expect(screen.getByTestId('btn-submit').tagName).toBe('BUTTON');
   expect(screen.getByTestId('btn-submit').textContent).toBe('Agregar Cita');
   expect(screen.getByTestId('btn-submit').textContent).not.toBe(
      'Agregar Nueva Cita'
   );
});
test('<Formulario /> Validacion de formulario ', () => {
   render(<Formulario crearCita={crearCita} />);
   //Hacer submit
   const btnSubmit = screen.getByTestId('btn-submit');
   userEvent.click(btnSubmit);
   //Revisar por alerta
   const alerta = screen.getByTestId('alerta');
   expect(alerta).toBeInTheDocument();
   expect(alerta.textContent).toBe('Todos los campos son obligatorios');
   expect(alerta.textContent).not.toBe('Todos los campos no son obligatorios');
   expect(alerta.tagName).toBe('P');
   expect(alerta.tagName).not.toBe('BUTTON');
});
test('<Formulario /> Validacion de formulario ', () => {
   render(<Formulario crearCita={crearCita} />);

   //    fireEvent.change(screen.getByTestId('mascota'), {
   //       target: { value: 'Hook' },
   //    });
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
    //Crear cita y comprobar que la funcion se haya llamado
    expect(crearCita).toHaveBeenCalled();
    expect(crearCita).toHaveBeenCalledTimes(1);
});
