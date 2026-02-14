# Proyecto_Modulo_4_ABP_Felipe_Leiva
Proyecto de cálculos en consola con JS 

# Simulador de Préstamos

## Descripción
Este proyecto lo desarrollé como un simulador de préstamos básico en el que el usuario puede ingresar sus datos, el monto solicitado y el número de cuotas. El sistema calcula automáticamente la tasa de interés según las cuotas seleccionadas, la cuota mensual y el total a pagar. Todo se muestra en pantalla con un diseño responsive usando **Bootstrap** y validaciones con **JavaScript**.

## Funcionalidades principales
- **Formateo del monto**: El campo de monto se formatea automáticamente con separadores de miles y el símbolo `$` mientras el usuario escribe.
- **Validación del monto**: El simulador solo acepta montos superiores a $1.000.000. Si el valor ingresado es menor, se muestra un mensaje de feedback bajo el input.
- **Selección de cuotas**: Al elegir el número de cuotas, se asigna automáticamente la tasa anual correspondiente y se muestra en un campo deshabilitado.
- **Cálculo de préstamo**:
  - Conversión de tasa anual a tasa mensual.
  - Aplicación de la fórmula de cuota fija (sistema francés).
  - Cálculo de la cuota mensual y el total a pagar.
  - Redondeo de valores al entero más cercano.
- **Visualización de resultados**: Los resultados se muestran en pantalla con formato monetario (`toLocaleString("es-CL")`) y se habilita un botón secundario.
- **Botón "Volver a simular"**: Este botón aparece solo después de una simulación y permite limpiar los resultados, resetear el formulario y volver al estado inicial.

## Flujo de uso
1. El usuario ingresa sus datos personales y el monto solicitado.
2. Selecciona el número de cuotas.
3. El sistema muestra automáticamente la tasa anual correspondiente.
4. Al presionar **Simular**, se valida el monto y, si es correcto, se calculan la cuota mensual y el total a pagar.
5. Los resultados se muestran en pantalla y aparece el botón **Volver a simular**.
6. Al presionar **Volver a simular**, se limpian los resultados y el formulario queda listo para una nueva simulación.

## Tecnologías utilizadas
- **HTML5** para la estructura de las pantallas.
- **CSS3 y Bootstrap** para el diseño responsive y estilos.
- **JavaScript** para la lógica de validación, cálculo y manejo de eventos.

---
