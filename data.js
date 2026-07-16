// Base de datos de ejercicios para la aplicación de normalización y diseño de BD
window.dbExercises = [
  {
    id: 1,
    title: "1. Nómina",
    description: "Este ejercicio modela el sistema de nómina de empleados de una empresa, analizando las relaciones entre empleados, cargos y departamentos, así como el cálculo de asignaciones y deducciones.",
    content1nf: `
      <h3>Primera Forma Normal (1NF) - Nómina</h3>
      <p>Todos los campos deben ser atómicos. La descomposición de nombres y apellidos es obligatoria bajo el criterio del profesor, mientras que la separación de cédula y teléfono es opcional.</p>
    `,
    content2nf: `
      <h3>Segunda Forma Normal (2NF) - Nómina</h3>
      <p>Se eliminan las dependencias parciales. Bajo la teoría del profesor, los teléfonos multivalorados se separan en este paso para evitar redundancia de datos.</p>
    `,
    content3nf: `
      <h3>Tercera Forma Normal (3NF) - Nómina</h3>
      <p>Se eliminan las dependencias transitivas (el cargo determina el sueldo). Los totales (asignaciones, neto a pagar) se evalúan para almacenamiento vs procesamiento.</p>
    `,
    tables1nf: [
      {
        name: "RECIBO_NOMINA_COMPLETO",
        fields: [
          "*Nro_Recibo",
          "C.I._Empleado",
          "Nombres_Empleado",
          "Apellidos_Empleado",
          "Fecha_Nacimiento",
          "Fecha_Ingreso",
          "Código_Departamento",
          "Descripción_Departamento",
          "Código_Cargo",
          "Descripción_Cargo",
          "Fecha_Pago",
          "Sueldo",
          "Código_Concepto_Pago",
          "Descripción_Concepto_Pago",
          "Tipo_Concepto",
          "Frecuencia_Pago",
          "Monto_Concepto",
          "Total_Asignaciones",
          "Total_Deducciones",
          "Neto_a_Pagar",
          "Número_Teléfono"
        ]
      }
    ],
    tables2nf: [
      {
        name: "EMPLEADO",
        fields: [
          "*C.I._Empleado",
          "Nombres_Empleado",
          "Apellidos_Empleado",
          "Fecha_Nacimiento",
          "Fecha_Ingreso",
          "Código_Departamento",
          "Código_Cargo"
        ]
      },
      {
        name: "DEPARTAMENTO",
        fields: [
          "*Código_Departamento",
          "Descripción_Departamento"
        ]
      },
      {
        name: "CARGO",
        fields: [
          "*Código_Cargo",
          "Descripción_Cargo",
          "Sueldo",
          "Fecha_Pago"
        ]
      },
      {
        name: "TELEFONOS",
        fields: [
          "*C.I._Empleado",
          "*Número_Teléfono"
        ]
      },
      {
        name: "RECIBO_DETALLE_CONCEPTO",
        fields: [
          "*Nro_Recibo",
          "C.I._Empleado",
          "Código_Concepto_Pago",
          "Descripción_Concepto_Pago",
          "Tipo_Concepto",
          "Frecuencia_Pago",
          "Monto_Concepto",
          "Total_Asignaciones",
          "Total_Deducciones",
          "Neto_a_Pagar"
        ]
      }
    ],
    tables3nf: [
      {
        name: "EMPLEADO",
        fields: [
          "*C.I._Empleado",
          "Nombres",
          "Apellidos",
          "Fecha_Nacimiento",
          "Fecha_Ingreso",
          "Código_Cargo",
          "Código_Departamento"
        ]
      },
      {
        name: "DEPARTAMENTO",
        fields: [
          "*Código_Departamento",
          "Descripción_Departamento"
        ]
      },
      {
        name: "CARGO",
        fields: [
          "*Código_Cargo",
          "Descripción_Cargo",
          "Sueldo",
          "Fecha_Pago"
        ]
      },
      {
        name: "telefonos",
        fields: [
          "*C.I._Empleado",
          "*Número_Teléfono"
        ]
      },
      {
        name: "CONCEPTO",
        fields: [
          "*Código_Concepto_Pago",
          "Descripción_Concepto_Pago",
          "Tipo_Concepto",
          "Frecuencia_Pago"
        ]
      },
      {
        name: "RECIBO",
        fields: [
          "*Nro_Recibo",
          "C.I._Empleado",
          "Total_Asignaciones",
          "Total_Deducciones",
          "Neto_a_Pagar"
        ]
      },
      {
        name: "DETALLE_RECIBO",
        fields: [
          "*Nro_Recibo",
          "*Código_Concepto_Pago",
          "Monto_Concepto"
        ]
      }
    ],
    connections: [
      "EMPLEADO.Código_Departamento ➔ DEPARTAMENTO.Código_Departamento",
      "EMPLEADO.Código_Cargo ➔ CARGO.Código_Cargo",
      "telefonos.C.I._Empleado ➔ EMPLEADO.C.I._Empleado",
      "RECIBO.C.I._Empleado ➔ EMPLEADO.C.I._Empleado",
      "DETALLE_RECIBO.Nro_Recibo ➔ RECIBO.Nro_Recibo",
      "DETALLE_RECIBO.Código_Concepto_Pago ➔ CONCEPTO.Código_Concepto_Pago"
    ],
    comparison: `
      <div class="glass-callout">
        <h4>Comparación Académica vs. Industrial</h4>
        <p><strong>Académico (Profesor):</strong> Los teléfonos multivalorados se separan en la 2NF. Los totales se guardan en la 3NF tras evaluar el balance de almacenamiento vs. procesamiento.</p>
        <p><strong>Industrial:</strong> Los multivalorados se extraen en la 1NF. Los totales se calculan dinámicamente mediante consultas SQL o vistas para evitar inconsistencias de actualización.</p>
      </div>
    `,
    erDiagram: `
      <svg id="er-diagram-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" width="100%" height="100%">
        <!-- == Fila Superior (y=60) == -->
        <g class="svg-entity" tabindex="0">
          <rect x="75" y="60" width="130" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="140" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="12" text-anchor="middle">DEPARTAMENTO</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="365" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="420" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="12" text-anchor="middle">EMPLEADO</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="650" y="60" width="100" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="700" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="12" text-anchor="middle">CARGO</text>
        </g>

        <!-- == Fila Media (y=240) == -->
        <g class="svg-entity" tabindex="0">
          <rect x="85" y="240" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="140" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="12" text-anchor="middle">CONCEPTO</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="370" y="240" width="100" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="420" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="12" text-anchor="middle">RECIBO</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="645" y="240" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="700" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="12" text-anchor="middle">telefonos</text>
        </g>

        <!-- == Fila Inferior (y=420) == -->
        <!-- DETALLE_RECIBO (Entidad Débil/Intermediaria centrada entre CONCEPTO y RECIBO) -->
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="205" y="420" width="150" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="209" y="424" width="142" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="280" y="445" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">DETALLE_RECIBO</text>
        </g>

        <!-- == Rombos Superiores (Horizontales) == -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="280,55 310,80 280,105 250,80" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="280" y="84" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">Tiene</text>
        </g>
        <line x1="205" y1="80" x2="250" y2="80" stroke="#64748b" stroke-width="1.5" />
        <line x1="310" y1="80" x2="365" y2="80" stroke="#64748b" stroke-width="1.5" />
        <text x="215" y="72" fill="#f43f5e" font-size="12">1</text>
        <text x="350" y="72" fill="#f43f5e" font-size="12">N</text>

        <g class="svg-relationship" tabindex="0">
          <polygon points="560,55 590,80 560,105 530,80" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="560" y="84" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">Ocupa</text>
        </g>
        <line x1="475" y1="80" x2="530" y2="80" stroke="#64748b" stroke-width="1.5" />
        <line x1="590" y1="80" x2="650" y2="80" stroke="#64748b" stroke-width="1.5" />
        <text x="490" y="72" fill="#f43f5e" font-size="12">N</text>
        <text x="635" y="72" fill="#f43f5e" font-size="12">1</text>

        <!-- == Rombos Medios (Verticales desde EMPLEADO) == -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="420,145 450,170 420,195 390,170" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="420" y="174" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">Recibe</text>
        </g>
        <line x1="420" y1="100" x2="420" y2="145" stroke="#64748b" stroke-width="1.5" />
        <text x="430" y="125" fill="#f43f5e" font-size="12">1</text>
        <line x1="420" y1="195" x2="420" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="430" y="225" fill="#f43f5e" font-size="12">N</text>

        <g class="svg-relationship" tabindex="0">
          <polygon points="700,145 730,170 700,195 670,170" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="700" y="174" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">Posee</text>
        </g>
        <line x1="460" y1="100" x2="685" y2="155" stroke="#64748b" stroke-width="1.5" />
        <text x="480" y="125" fill="#f43f5e" font-size="12">1</text>
        <line x1="700" y1="195" x2="700" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="710" y="225" fill="#f43f5e" font-size="12">M</text>

        <!-- == Rombos Inferiores (Verticales → Diagonales a DETALLE_RECIBO) == -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="140,325 170,350 140,375 110,350" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="140" y="354" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">De</text>
        </g>
        <line x1="140" y1="280" x2="140" y2="325" stroke="#64748b" stroke-width="1.5" />
        <text x="150" y="305" fill="#f43f5e" font-size="12">M</text>
        <line x1="140" y1="375" x2="230" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="160" y="410" fill="#f43f5e" font-size="12">1</text>

        <g class="svg-relationship" tabindex="0">
          <polygon points="420,325 450,350 420,375 390,350" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="420" y="354" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">Genera</text>
        </g>
        <line x1="420" y1="280" x2="420" y2="325" stroke="#64748b" stroke-width="1.5" />
        <text x="430" y="305" fill="#f43f5e" font-size="12">N</text>
        <line x1="420" y1="375" x2="330" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="390" y="410" fill="#f43f5e" font-size="12">1</text>

        <!-- == Elipses de clave primaria == -->
        <g class="svg-attribute">
          <ellipse cx="140" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="140" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">CodDepto</text>
          <line x1="140" y1="35" x2="140" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="420" cy="20" rx="30" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="420" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">C.I.</text>
          <line x1="420" y1="35" x2="420" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="700" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="700" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">CodCargo</text>
          <line x1="700" y1="35" x2="700" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="140" cy="200" rx="42" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="140" y="204" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">CodConcepto</text>
          <line x1="140" y1="215" x2="140" y2="240" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="280" cy="260" rx="40" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="280" y="264" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">NroRecibo</text>
          <line x1="320" y1="260" x2="370" y2="260" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
      </svg>
    `
  },
  {
    id: 2,
    title: "2. Ajustes de Nómina",
    description: "Modificaciones al caso anterior de nómina para soportar sueldos particulares para cada empleado y el trabajo de un empleado en múltiples departamentos de forma simultánea.",
    content1nf: `
      <h3>Primera Forma Normal (1NF) - Ajustes de Nómina</h3>
      <p>Se dividen los datos compuestos para asegurar que cada campo sea atómico. La descomposición del nombre completo es obligatoria.</p>
    `,
    content2nf: `
      <h3>Segunda Forma Normal (2NF) - Ajustes de Nómina</h3>
      <p>Bajo la 2NF, se extrae la tabla de ajustes por departamento. La llave o clave primaria compuesta se divide para evitar redundancia de datos entre departamentos y el detalle de cada ajuste.</p>
    `,
    content3nf: `
      <h3>Tercera Forma Normal (3NF) - Ajustes de Nómina</h3>
      <p>Se eliminan dependencias transitivas asociadas al cargo y el tipo de ajuste.</p>
    `,
    tables1nf: [
      {
        name: "AJUSTES_NOMINA_COMPLETO",
        fields: [
          "*Nro_Recibo",
          "C.I._Empleado",
          "Nombres_Empleado",
          "Apellidos_Empleado",
          "Fecha_Nacimiento",
          "Fecha_Ingreso",
          "Código_Departamento",
          "Descripción_Departamento",
          "Fecha_Ingreso_Depto",
          "Código_Cargo",
          "Descripción_Cargo",
          "Sueldo_Particular",
          "Frecuencia_Pago",
          "Número_Teléfono",
          "Código_Concepto_Pago"
        ]
      }
    ],
    tables2nf: [
      {
        name: "EMPLEADO",
        fields: [
          "*C.I._Empleado",
          "Nombres_Empleado",
          "Apellidos_Empleado",
          "Fecha_Nacimiento",
          "Fecha_Ingreso",
          "Código_Cargo",
          "Sueldo_Particular"
        ]
      },
      {
        name: "DEPARTAMENTO",
        fields: [
          "*Código_Departamento",
          "Descripción_Departamento"
        ]
      },
      {
        name: "EMPLEADO_DEPARTAMENTO",
        fields: [
          "*C.I._Empleado",
          "*Código_Departamento",
          "Fecha_Ingreso_Depto"
        ]
      },
      {
        name: "TELEFONOS",
        fields: [
          "*C.I._Empleado",
          "*Número_Teléfono"
        ]
      }
    ],
    tables3nf: [
      {
        name: "EMPLEADO",
        fields: [
          "*C.I._Empleado",
          "Nombres",
          "Apellidos",
          "Fecha_Nacimiento",
          "Fecha_Ingreso",
          "Código_Cargo",
          "Sueldo_Particular"
        ]
      },
      {
        name: "DEPARTAMENTO",
        fields: [
          "*Código_Departamento",
          "Descripción_Departamento"
        ]
      },
      {
        name: "EMPLEADO_DEPARTAMENTO",
        fields: [
          "*C.I._Empleado",
          "*Código_Departamento",
          "Fecha_Ingreso_Depto"
        ]
      },
      {
        name: "CARGO",
        fields: [
          "*Código_Cargo",
          "Descripción_Cargo"
        ]
      },
      {
        name: "telefonos",
        fields: [
          "*C.I._Empleado",
          "*Número_Teléfono"
        ]
      }
    ],
    connections: [
      "EMPLEADO_DEPARTAMENTO.C.I._Empleado ➔ EMPLEADO.C.I._Empleado",
      "EMPLEADO_DEPARTAMENTO.Código_Departamento ➔ DEPARTAMENTO.Código_Departamento",
      "EMPLEADO.Código_Cargo ➔ CARGO.Código_Cargo",
      "telefonos.C.I._Empleado ➔ EMPLEADO.C.I._Empleado"
    ],
    comparison: `
      <div class="glass-callout">
        <h4>Comparación Académica vs. Industrial</h4>
        <p><strong>Académico:</strong> Para que el empleado trabaje en varios departamentos, la relación pasa de 1:N a N:M, lo que exige una tabla asociativa. El sueldo particular se almacena en el Empleado y no en el Cargo.</p>
        <p><strong>Industrial:</strong> La tabla asociativa de empleados y departamentos suele registrar auditorías completas e historial de cargos y sueldos para mantener la trazabilidad histórica de compensaciones.</p>
      </div>
    `,
    erDiagram: `
      <svg id="er-diagram-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 400" width="100%" height="100%">
        <!-- Fila principal: DEPARTAMENTO, EMPLEADO, CARGO -->
        <g class="svg-entity" tabindex="0">
          <rect x="75" y="80" width="130" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="140" y="105" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="12" text-anchor="middle">DEPARTAMENTO</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="360" y="80" width="120" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="420" y="105" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="12" text-anchor="middle">EMPLEADO</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="650" y="80" width="100" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="700" y="105" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">CARGO</text>
        </g>

        <!-- Entidades inferiores -->
        <!-- EMPLEADO_DEPARTAMENTO (tabla intermediaria centrada entre DEP y EMP) -->
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="190" y="310" width="180" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="194" y="314" width="172" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="280" y="335" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">EMPLEADO_DEPARTAMENTO</text>
        </g>
        <!-- telefonos (entidad débil conectada a EMPLEADO) -->
        <g class="svg-entity" tabindex="0">
          <rect x="500" y="310" width="120" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="560" y="335" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="12" text-anchor="middle">telefonos</text>
        </g>

        <!-- Rombo Ocupa: EMPLEADO → CARGO (horizontal) -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="560,75 590,100 560,125 530,100" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="560" y="104" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Ocupa</text>
        </g>
        <line x1="480" y1="100" x2="530" y2="100" stroke="#64748b" stroke-width="1.5" />
        <line x1="590" y1="100" x2="650" y2="100" stroke="#64748b" stroke-width="1.5" />
        <text x="495" y="92" fill="#f43f5e" font-size="12">N</text>
        <text x="630" y="92" fill="#f43f5e" font-size="12">1</text>

        <!-- Rombo Pertenece: DEPARTAMENTO baja RECTO → Pertenece → diagonal a EMP_DEP -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="140,185 170,210 140,235 110,210" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="140" y="214" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Pertenece</text>
        </g>
        <line x1="140" y1="120" x2="140" y2="185" stroke="#64748b" stroke-width="1.5" />
        <text x="150" y="160" fill="#f43f5e" font-size="12">N</text>
        <line x1="140" y1="235" x2="220" y2="310" stroke="#64748b" stroke-width="1.5" />
        <text x="165" y="290" fill="#f43f5e" font-size="12">1</text>

        <!-- Rombo Asociado: EMPLEADO baja RECTO → Asociado → diagonal a EMP_DEP -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="420,185 450,210 420,235 390,210" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="420" y="214" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Asociado</text>
        </g>
        <line x1="420" y1="120" x2="420" y2="185" stroke="#64748b" stroke-width="1.5" />
        <text x="430" y="160" fill="#f43f5e" font-size="12">M</text>
        <line x1="420" y1="235" x2="340" y2="310" stroke="#64748b" stroke-width="1.5" />
        <text x="390" y="290" fill="#f43f5e" font-size="12">1</text>

        <!-- Rombo Tiene: EMPLEADO diagonal → Tiene → RECTO a telefonos -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="560,185 590,210 560,235 530,210" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="560" y="214" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Tiene</text>
        </g>
        <line x1="460" y1="120" x2="545" y2="195" stroke="#64748b" stroke-width="1.5" />
        <text x="510" y="155" fill="#f43f5e" font-size="12">1</text>
        <line x1="560" y1="235" x2="560" y2="310" stroke="#64748b" stroke-width="1.5" />
        <text x="570" y="290" fill="#f43f5e" font-size="12">M</text>

        <!-- Ellipses Primary Keys -->
        <g class="svg-attribute">
          <ellipse cx="140" cy="40" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="140" y="44" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">CodDepto</text>
          <line x1="140" y1="55" x2="140" y2="80" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="420" cy="40" rx="30" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="420" y="44" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">C.I.</text>
          <line x1="420" y1="55" x2="420" y2="80" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="700" cy="40" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="700" y="44" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">CodCargo</text>
          <line x1="700" y1="55" x2="700" y2="80" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
      </svg>
    `
  },
  {
    id: 3,
    title: "3. Orden de Compra",
    description: "Consideración de tablas correspondientes a Órdenes de Compra con Proveedores y Materiales distribuidos de forma cruzada.",
    content1nf: `
      <h3>Primera Forma Normal (1NF) - Orden de Compra</h3>
      <p>Se atomizan los nombres de proveedores y las direcciones de entrega para cumplir con la primera forma normal.</p>
    `,
    content2nf: `
      <h3>Segunda Forma Normal (2NF) - Orden de Compra</h3>
      <p>Separación de los productos incluidos en cada orden para evitar grupos de repetición en el cuerpo de la factura.</p>
    `,
    content3nf: `
      <h3>Tercera Forma Normal (3NF) - Orden de Compra</h3>
      <p>Resolución de la relación de materiales y proveedores para evitar dependencias cruzadas redundantes.</p>
    `,
    tables1nf: [
      {
        name: "ORDEN_COMPRA_COMPLETO",
        fields: [
          "*Número_de_la_Orden",
          "Código_del_Proveedor",
          "Nombre_del_Proveedor",
          "Dirección_del_Proveedor",
          "Fecha_de_la_Orden",
          "Código_del_material",
          "Descripción_del_material",
          "Precio_Unitario",
          "Cantidad",
          "Monto_total_del_material",
          "Monto_total_de_la_Orden"
        ]
      }
    ],
    tables2nf: [
      {
        name: "PROVEEDOR",
        fields: [
          "*Código_del_Proveedor",
          "Nombre_del_Proveedor",
          "Dirección_del_Proveedor"
        ]
      },
      {
        name: "ORDEN",
        fields: [
          "*Número_de_la_Orden",
          "Código_del_Proveedor",
          "Fecha_de_la_Orden",
          "Monto_total_de_la_Orden"
        ]
      },
      {
        name: "DETALLE_ORDEN_PRODUCTO",
        fields: [
          "*Número_de_la_Orden",
          "*Código_del_material",
          "Descripción_del_material",
          "Precio_Unitario",
          "Cantidad",
          "Monto_total_del_material"
        ]
      }
    ],
    tables3nf: [
      {
        name: "PROVEEDOR",
        fields: [
          "*Código_del_Proveedor",
          "Nombre_del_Proveedor",
          "Dirección_del_Proveedor"
        ]
      },
      {
        name: "MATERIAL",
        fields: [
          "*Código_del_material",
          "Descripción_del_material",
          "Precio_Unitario"
        ]
      },
      {
        name: "ORDEN",
        fields: [
          "*Número_de_la_Orden",
          "Código_del_Proveedor",
          "Fecha_de_la_Orden",
          "Monto_total_de_la_Orden"
        ]
      },
      {
        name: "DETALLE_ORDEN",
        fields: [
          "*Número_de_la_Orden",
          "*Código_del_material",
          "Cantidad",
          "Monto_total_del_material"
        ]
      },
    ],
    connections: [
      "ORDEN.Código_del_Proveedor ➔ PROVEEDOR.Código_del_Proveedor",
      "DETALLE_ORDEN.Número_de_la_Orden ➔ ORDEN.Número_de_la_Orden",
      "DETALLE_ORDEN.Código_del_material ➔ MATERIAL.Código_del_material"
    ],
    comparison: `
      <div class="glass-callout">
        <h4>Comparación Académica vs. Industrial</h4>
        <p><strong>Académico:</strong> Dado que "un proveedor puede distribuir varios tipos de material" y "un material puede ser proporcionado por distintos proveedores", se crea una tabla de asociación N:M pura entre ellos.</p>
        <p><strong>Industrial:</strong> La relación N:M suele gestionarse dinámicamente mediante catálogos de precios por proveedor y órdenes de compra con referencias cruzadas.</p>
      </div>
    `,
    erDiagram: `
      <svg id="er-diagram-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 400" width="100%" height="100%">

        <!-- == ENTIDADES PRINCIPALES (fila superior) == -->
        <!-- PROVEEDOR: centro x=80 -->
        <g class="svg-entity" tabindex="0">
          <rect x="20" y="90" width="120" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="80" y="115" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="12" text-anchor="middle">PROVEEDOR</text>
        </g>
        <!-- ORDEN: centro x=370 (alineado con rombo Contiene) -->
        <g class="svg-entity" tabindex="0">
          <rect x="320" y="90" width="100" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="370" y="115" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="12" text-anchor="middle">ORDEN</text>
        </g>
        <!-- MATERIAL: centro x=570 (alineado con rombo Incluye) -->
        <g class="svg-entity" tabindex="0">
          <rect x="510" y="90" width="120" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="570" y="115" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="12" text-anchor="middle">MATERIAL</text>
        </g>

        <!-- == TABLA INTERMEDIARIA centrada exactamente en x=470 == -->
        <!-- Centro = (370+570)/2 = 470 → rect x = 470-75 = 395 -->
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="395" y="310" width="150" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="399" y="314" width="142" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="470" y="335" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">DETALLE_ORDEN</text>
        </g>

        <!-- == ROMBO Emite: PROVEEDOR –1:N– ORDEN (horizontal) == -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="215,85 245,110 215,135 185,110" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="215" y="114" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Emite</text>
        </g>
        <line x1="140" y1="110" x2="185" y2="110" stroke="#64748b" stroke-width="1.5" />
        <line x1="245" y1="110" x2="320" y2="110" stroke="#64748b" stroke-width="1.5" />
        <text x="152" y="102" fill="#f43f5e" font-size="12">1</text>
        <text x="304" y="102" fill="#f43f5e" font-size="12">N</text>

        <!-- == ROMBO Contiene: ORDEN baja RECTO → rombo → diagonal simétrica == -->
        <!-- Rombo centro x=370, y=210 -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="370,185 400,210 370,235 340,210" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="370" y="214" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Contiene</text>
        </g>
        <!-- ORDEN(370,130) → rombo(370,185): vertical recta -->
        <line x1="370" y1="130" x2="370" y2="185" stroke="#64748b" stroke-width="1.5" />
        <text x="380" y="162" fill="#f43f5e" font-size="12">N</text>
        <!-- rombo(370,235) → DETALLE_ORDEN izq (395+10=405, 310): dx=+35, dy=+75 -->
        <line x1="370" y1="235" x2="420" y2="310" stroke="#64748b" stroke-width="1.5" />
        <text x="378" y="290" fill="#f43f5e" font-size="12">1</text>

        <!-- == ROMBO Incluye: MATERIAL baja RECTO → rombo → diagonal simétrica == -->
        <!-- Rombo centro x=570, y=210 -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="570,185 600,210 570,235 540,210" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="570" y="214" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Incluye</text>
        </g>
        <!-- MATERIAL(570,130) → rombo(570,185): vertical recta -->
        <line x1="570" y1="130" x2="570" y2="185" stroke="#64748b" stroke-width="1.5" />
        <text x="580" y="162" fill="#f43f5e" font-size="12">M</text>
        <!-- rombo(570,235) → DETALLE_ORDEN der (545-10=520, 310): dx=-50, dy=+75 -->
        <line x1="570" y1="235" x2="520" y2="310" stroke="#64748b" stroke-width="1.5" />
        <text x="552" y="290" fill="#f43f5e" font-size="12">1</text>

        <!-- == ELIPSES clave primaria == -->
        <g class="svg-attribute">
          <ellipse cx="80" cy="48" rx="40" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="80" y="52" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CodProve</text>
          <line x1="80" y1="63" x2="80" y2="90" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="370" cy="48" rx="38" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="370" y="52" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">NroOrden</text>
          <line x1="370" y1="63" x2="370" y2="90" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="570" cy="48" rx="42" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="570" y="52" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CodMaterial</text>
          <line x1="570" y1="63" x2="570" y2="90" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
      </svg>
    `
  },
  {
    id: 4,
    title: "4. Clínica Médica",
    description: "Sistema para el control y registro de consultas médicas de pacientes con asignación de médicos, clínicas y especialidades.",
    content1nf: `
      <h3>Primera Forma Normal (1NF) - Clínica Médica</h3>
      <p>Atomización de historia y datos del paciente para cumplir con la primera forma normal.</p>
    `,
    content2nf: `
      <h3>Segunda Forma Normal (2NF) - Clínica Médica</h3>
      <p>Separación de consultas y especialidades médicas. Las dependencias funcionales parciales se resuelven.</p>
    `,
    content3nf: `
      <h3>Tercera Forma Normal (3NF) - Clínica Médica</h3>
      <p>Se eliminan dependencias transitivas en el diagnóstico e historial clínico.</p>
    `,
    tables1nf: [
      {
        name: "CLINICA_COMPLETO",
        fields: [
          "*CodClinica",
          "NombreClinica",
          "DireccClinica",
          "*NroMatriculaMed",
          "NombreMed",
          "CiMed",
          "CodEspecialidadMed",
          "DescEspecialidadMed",
          "*NroHistoriaPac",
          "CiPac",
          "NombrePac",
          "FnacPac",
          "DirecPac",
          "TlfPac",
          "ProfPac",
          "FechaConsulta",
          "MontoConsulta",
          "Síntomas",
          "Medicamentos"
        ]
      }
    ],
    tables2nf: [
      {
        name: "CLINICA",
        fields: [
          "*CodClinica",
          "NombreClinica",
          "DireccClinica"
        ]
      },
      {
        name: "MEDICO",
        fields: [
          "*NroMatriculaMed",
          "CiMed",
          "NombreMed",
          "CodClinica"
        ]
      },
      {
        name: "PACIENTE",
        fields: [
          "*NroHistoriaPac",
          "CiPac",
          "NombrePac",
          "FnacPac",
          "DirecPac",
          "TlfPac",
          "ProfPac"
        ]
      },
      {
        name: "MEDICO_ESPECIALIDAD",
        fields: [
          "*NroMatriculaMed",
          "*CodEspecialidadMed",
          "DescEspecialidadMed"
        ]
      },
      {
        name: "CONSULTA_DETALLADA",
        fields: [
          "*NroHistoriaPac",
          "*NroMatriculaMed",
          "*FechaConsulta",
          "MontoConsulta",
          "Síntomas",
          "Medicamentos"
        ]
      }
    ],
    tables3nf: [
      {
        name: "CLINICA",
        fields: [
          "*CodClinica",
          "NombreClinica",
          "DireccClinica"
        ]
      },
      {
        name: "MEDICO",
        fields: [
          "*NroMatriculaMed",
          "CiMed",
          "NombreMed",
          "CodClinica"
        ]
      },
      {
        name: "PACIENTE",
        fields: [
          "*NroHistoriaPac",
          "CiPac",
          "NombrePac",
          "FnacPac",
          "DirecPac",
          "TlfPac",
          "ProfPac"
        ]
      },
      {
        name: "ESPECIALIDAD",
        fields: [
          "*CodEspecialidadMed",
          "DescEspecialidadMed"
        ]
      },
      {
        name: "MEDICO_ESPECIALIDAD",
        fields: [
          "*NroMatriculaMed",
          "*CodEspecialidadMed"
        ]
      },
      {
        name: "CONSULTA",
        fields: [
          "*NroHistoriaPac",
          "*NroMatriculaMed",
          "*FechaConsulta",
          "Síntomas",
          "Medicamentos",
          "MontoConsulta"
        ]
      }
    ],
    connections: [
      "MEDICO.CodClinica ➔ CLINICA.CodClinica",
      "MEDICO_ESPECIALIDAD.NroMatriculaMed ➔ MEDICO.NroMatriculaMed",
      "MEDICO_ESPECIALIDAD.CodEspecialidadMed ➔ ESPECIALIDAD.CodEspecialidadMed",
      "CONSULTA.NroHistoriaPac ➔ PACIENTE.NroHistoriaPac",
      "CONSULTA.NroMatriculaMed ➔ MEDICO.NroMatriculaMed"
    ],
    comparison: `
      <div class="glass-callout">
        <h4>Comparación Académica vs. Industrial</h4>
        <p><strong>Académico:</strong> La Consulta es una relación e incluso una entidad débil dependiente de Paciente y Médico. Los montos de consultas se consideran en 3FN.</p>
        <p><strong>Industrial:</strong> Se prefiere un ID autoincremental único como clave primaria de la tabla ` + "`Consulta`" + ` en lugar de la clave compuesta compleja.</p>
      </div>
    `,
    erDiagram: `
      <svg id="er-diagram-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" width="100%" height="100%">
        <!-- == Fila Superior (y=60) == -->
        <g class="svg-entity" tabindex="0">
          <rect x="155" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="210" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">CLINICA</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="365" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="420" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">MEDICO</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="575" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="630" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">ESPECIALIDAD</text>
        </g>

        <!-- == Fila Media (y=240) == -->
        <g class="svg-entity" tabindex="0">
          <rect x="155" y="240" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="210" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">PACIENTE</text>
        </g>

        <!-- == Fila Inferior - Tablas Intermediarias (y=420) == -->
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="240" y="420" width="150" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="244" y="424" width="142" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="315" y="445" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">CONSULTA</text>
        </g>
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="450" y="420" width="150" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="454" y="424" width="142" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="525" y="445" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">MEDICO_ESPECIALIDAD</text>
        </g>

        <!-- == Rombos y Conexiones == -->
        <!-- Pertenece: CLINICA ↔ MEDICO -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="315,55 345,80 315,105 285,80" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="315" y="84" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Pertenece</text>
        </g>
        <line x1="265" y1="80" x2="285" y2="80" stroke="#64748b" stroke-width="1.5" />
        <line x1="345" y1="80" x2="365" y2="80" stroke="#64748b" stroke-width="1.5" />
        <text x="270" y="72" fill="#f43f5e" font-size="11">1</text>
        <text x="355" y="72" fill="#f43f5e" font-size="11">N</text>

        <!-- Atiende: MEDICO ↔ CONSULTA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="315,235 345,260 315,285 285,260" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="315" y="264" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Atiende</text>
        </g>
        <line x1="390" y1="100" x2="315" y2="235" stroke="#64748b" stroke-width="1.5" />
        <text x="385" y="125" fill="#f43f5e" font-size="11">N</text>
        <line x1="315" y1="285" x2="315" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="325" y="410" fill="#f43f5e" font-size="11">1</text>

        <!-- Registra: PACIENTE ↔ CONSULTA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="210,315 240,340 210,365 180,340" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="210" y="344" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Registra</text>
        </g>
        <line x1="210" y1="280" x2="210" y2="315" stroke="#64748b" stroke-width="1.5" />
        <text x="220" y="305" fill="#f43f5e" font-size="11">M</text>
        <line x1="210" y1="365" x2="260" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="230" y="410" fill="#f43f5e" font-size="11">1</text>

        <!-- Posee: MEDICO ↔ MEDICO_ESPECIALIDAD -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="525,235 555,260 525,285 495,260" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="525" y="264" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Posee</text>
        </g>
        <line x1="450" y1="100" x2="525" y2="235" stroke="#64748b" stroke-width="1.5" />
        <text x="455" y="125" fill="#f43f5e" font-size="11">N</text>
        <line x1="525" y1="285" x2="525" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="535" y="410" fill="#f43f5e" font-size="11">1</text>

        <!-- De: ESPECIALIDAD ↔ MEDICO_ESPECIALIDAD -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="630,235 660,260 630,285 600,260" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="630" y="264" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">De</text>
        </g>
        <line x1="630" y1="100" x2="630" y2="235" stroke="#64748b" stroke-width="1.5" />
        <text x="640" y="125" fill="#f43f5e" font-size="11">M</text>
        <line x1="630" y1="285" x2="580" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="590" y="410" fill="#f43f5e" font-size="11">1</text>

        <!-- == Elipses de clave primaria == -->
        <g class="svg-attribute">
          <ellipse cx="210" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="210" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CodClinica</text>
          <line x1="210" y1="35" x2="210" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="420" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="420" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">NroMatricula</text>
          <line x1="420" y1="35" x2="420" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="630" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="630" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CodEspec</text>
          <line x1="630" y1="35" x2="630" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="210" cy="200" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="210" y="204" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">NroHistoria</text>
          <line x1="210" y1="215" x2="210" y2="240" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
      </svg>
    `
  },
  {
    id: 5,
    title: "5. Consumos de Hotel",
    description: "El Hotel \"Las Estrellas\" requiere de un sistema de registro de huéspedes y de los consumos que éstos realicen durante su estadía en sus respectivas habitaciones.",
    content1nf: `
      <h3>Primera Forma Normal (1NF) - Consumos de Hotel</h3>
      <p>Atomización de datos del huésped para cumplir con la primera forma normal.</p>
    `,
    content2nf: `
      <h3>Segunda Forma Normal (2NF) - Consumos de Hotel</h3>
      <p>Separación de habitaciones y consumos. Las dependencias funcionales parciales se resuelven.</p>
    `,
    content3nf: `
      <h3>Tercera Forma Normal (3NF) - Consumos de Hotel</h3>
      <p>Eliminación de dependencias transitivas de impuestos y tipo de habitaciones.</p>
    `,
    tables1nf: [
      {
        name: "HUESPED_ESTADIA_COMPLETO",
        fields: [
          "*Cedula",
          "nombres",
          "apellidos",
          "dirección",
          "fechade_entrada",
          "hora_de_entrada",
          "fechadesalida",
          "horadesalida",
          "sexo",
          "status",
          "numeroTelefono",
          "codHab",
          "descripcion_Habitación",
          "Tipo_Habitación",
          "costohabitacion",
          "cantde_Camas",
          "CodTipoHabitacion",
          "descripcion_TipoHab",
          "CodConsumo",
          "Descripcion_Consumo",
          "monto_Consumo",
          "fecha_Consumo",
          "hora_Consumo",
          "cantidad_Consumo"
        ]
      }
    ],
    tables2nf: [
      {
        name: "HUESPED",
        fields: [
          "*Cédula",
          "nombres",
          "apellidos",
          "dirección",
          "fechade_entrada",
          "hora_de_entrada",
          "fechadesalida",
          "horadesalida",
          "sexo",
          "status",
          "codHab"
        ]
      },
      {
        name: "telefonos",
        fields: [
          "*cedula",
          "*numeroTelefono",
          "status"
        ]
      },
      {
        name: "HABITACIÓN",
        fields: [
          "*codHab",
          "descripcion",
          "Tipo",
          "costohabitacion",
          "cantde_Camas",
          "status",
          "disponibilidad"
        ]
      },
      {
        name: "TIPOHABITACIÓN",
        fields: [
          "*CodTipoHabitacion",
          "descripcion",
          "status"
        ]
      },
      {
        name: "CONSUMO",
        fields: [
          "*Cod",
          "Descripcion",
          "monto",
          "status"
        ]
      },
      {
        name: "CONSUMOXHUESPED",
        fields: [
          "*Cod",
          "huesped",
          "Consumo",
          "fecha",
          "hora",
          "cantidad"
        ]
      }
    ],
    tables3nf: [
      {
        name: "HUESPED",
        fields: [
          "*Cédula",
          "nombres",
          "apellidos",
          "dirección",
          "fechade_entrada",
          "hora_de_entrada",
          "fechadesalida",
          "horadesalida",
          "sexo",
          "status",
          "codHab"
        ]
      },
      {
        name: "telefonos",
        fields: [
          "*cedula",
          "*numeroTelefono",
          "status"
        ]
      },
      {
        name: "HABITACIÓN",
        fields: [
          "*codHab",
          "descripcion",
          "Tipo",
          "costohabitacion",
          "cantde_Camas",
          "status",
          "disponibilidad"
        ]
      },
      {
        name: "TIPOHABITACIÓN",
        fields: [
          "*CodTipoHabitacion",
          "descripcion",
          "status"
        ]
      },
      {
        name: "CONSUMO",
        fields: [
          "*Cod",
          "Descripcion",
          "monto",
          "status"
        ]
      },
      {
        name: "CONSUMOXHUESPED",
        fields: [
          "*Cod",
          "huesped",
          "Consumo",
          "fecha",
          "hora",
          "cantidad"
        ]
      }
    ],
    connections: [
      "telefonos.cedula ➔ HUESPED.Cédula",
      "HUESPED.codHab ➔ HABITACIÓN.codHab",
      "CONSUMOXHUESPED.huesped ➔ HUESPED.Cédula",
      "CONSUMOXHUESPED.Consumo ➔ CONSUMO.Cod",
      "HABITACIÓN.Tipo ➔ TIPOHABITACIÓN.CodTipoHabitacion"
    ],
    comparison: `
      <div class="glass-callout">
        <h4>Comparación Académica vs. Industrial</h4>
        <p><strong>Académico:</strong> Descomposición obligatoria de Nombres/Apellidos. Teléfonos en 2NF. Consumos asociados directamente al Huésped de forma lineal en la tabla CONSUMOXHUESPED.</p>
        <p><strong>Industrial:</strong> Los cargos de consumo se asocian a un Folio o Registro de Estadía en lugar de enlazar directamente la Cédula del Huésped de por vida, lo que permite múltiples visitas del mismo huésped.</p>
      </div>
    `,
    erDiagram: `
      <svg id="er-diagram-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" width="100%" height="100%">
        <!-- == Fila Superior (y=60) == -->
        <g class="svg-entity" tabindex="0">
          <rect x="75" y="60" width="130" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="140" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">TIPOHABITACION</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="365" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="420" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">HABITACION</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="645" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="700" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">CONSUMO</text>
        </g>

        <!-- == Fila Media (y=240) == -->
        <g class="svg-entity" tabindex="0">
          <rect x="85" y="240" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="140" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">telefonos</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="365" y="240" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="420" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">HUESPED</text>
        </g>

        <!-- == Fila Inferior - Tabla Intermediaria (y=420) == -->
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="480" y="420" width="160" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="484" y="424" width="152" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="560" y="445" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">CONSUMOXHUESPED</text>
        </g>

        <!-- == Rombos y Conexiones == -->
        <!-- Tiene: TIPOHABITACION ↔ HABITACION -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="280,55 310,80 280,105 250,80" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="280" y="84" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Tiene</text>
        </g>
        <line x1="205" y1="80" x2="250" y2="80" stroke="#64748b" stroke-width="1.5" />
        <line x1="310" y1="80" x2="365" y2="80" stroke="#64748b" stroke-width="1.5" />
        <text x="215" y="72" fill="#f43f5e" font-size="11">1</text>
        <text x="350" y="72" fill="#f43f5e" font-size="11">N</text>

        <!-- Ocupa: HABITACION ↔ HUESPED -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="420,145 450,170 420,195 390,170" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="420" y="174" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Ocupa</text>
        </g>
        <line x1="420" y1="100" x2="420" y2="145" stroke="#64748b" stroke-width="1.5" />
        <line x1="420" y1="195" x2="420" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="430" y="125" fill="#f43f5e" font-size="11">1</text>
        <text x="430" y="225" fill="#f43f5e" font-size="11">N</text>

        <!-- Posee: HUESPED ↔ telefonos -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="280,235 310,260 280,285 250,260" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="280" y="264" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Posee</text>
        </g>
        <line x1="365" y1="260" x2="310" y2="260" stroke="#64748b" stroke-width="1.5" />
        <line x1="250" y1="260" x2="195" y2="260" stroke="#64748b" stroke-width="1.5" />
        <text x="350" y="252" fill="#f43f5e" font-size="11">1</text>
        <text x="210" y="252" fill="#f43f5e" font-size="11">M</text>

        <!-- Registra: HUESPED ↔ CONSUMOXHUESPED -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="420,325 450,350 420,375 390,350" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="420" y="354" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Registra</text>
        </g>
        <line x1="420" y1="280" x2="420" y2="325" stroke="#64748b" stroke-width="1.5" />
        <text x="430" y="305" fill="#f43f5e" font-size="11">N</text>
        <line x1="420" y1="375" x2="480" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="440" y="410" fill="#f43f5e" font-size="11">1</text>

        <!-- De: CONSUMO ↔ CONSUMOXHUESPED -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="700,325 730,350 700,375 670,350" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="700" y="354" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">De</text>
        </g>
        <line x1="700" y1="100" x2="700" y2="325" stroke="#64748b" stroke-width="1.5" />
        <text x="710" y="200" fill="#f43f5e" font-size="11">M</text>
        <line x1="700" y1="375" x2="640" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="680" y="410" fill="#f43f5e" font-size="11">1</text>

        <!-- == Elipses de clave primaria == -->
        <g class="svg-attribute">
          <ellipse cx="140" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="140" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CodTipoHab</text>
          <line x1="140" y1="35" x2="140" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="420" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="420" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CodHab</text>
          <line x1="420" y1="35" x2="420" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="700" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="700" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CodConsu</text>
          <line x1="700" y1="35" x2="700" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="540" cy="220" rx="30" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="540" y="224" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Cedula</text>
          <line x1="510" y1="220" x2="475" y2="240" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
      </svg>
    `
  },
  {
    id: 6,
    title: "6. Normalización de Ventas",
    description: "Normalización de la tabla que detalla las operaciones de vendedores, clientes, almacenes de origen y montos de ventas.",
    content1nf: `
      <h3>Primera Forma Normal (1NF) - Normalización de Ventas</h3>
      <p>Se dividen los datos compuestos para asegurar la atomicidad de los registros de venta de vendedores y clientes.</p>
    `,
    content2nf: `
      <h3>Segunda Forma Normal (2NF) - Normalización de Ventas</h3>
      <p>Separación de los almacenes y el detalle de transacciones para cumplir con dependencias funcionales completas.</p>
    `,
    content3nf: `
      <h3>Tercera Forma Normal (3NF) - Normalización de Ventas</h3>
      <p>Eliminación de dependencias transitivas. Los vendedores y clientes se aíslan con sus respectivos identificadores.</p>
    `,
    tables1nf: [
      {
        name: "VENTAS_PLANILLA_UNICA",
        fields: [
          "Nro._Vendedor",
          "Nombre_Vendedor",
          "Nro._Cliente",
          "Nombre_Cliente",
          "Nro._Almacén",
          "Área_Ventas",
          "Monto"
        ]
      }
    ],
    tables2nf: [
      {
        name: "VENDEDOR",
        fields: [
          "*Nro._Vendedor",
          "Nombre_Vendedor",
          "Área_Ventas"
        ]
      },
      {
        name: "CLIENTE",
        fields: [
          "*Nro._Cliente",
          "Nombre_Cliente"
        ]
      },
      {
        name: "DETALLE_TRANSACCION",
        fields: [
          "*Nro._Vendedor",
          "*Nro._Cliente",
          "Nro._Almacén",
          "Monto"
        ]
      }
    ],
    tables3nf: [
      {
        name: "VENDEDOR",
        fields: [
          "*Nro._Vendedor",
          "Nombre_Vendedor",
          "Área_Ventas"
        ]
      },
      {
        name: "CLIENTE",
        fields: [
          "*Nro._Cliente",
          "Nombre_Cliente"
        ]
      },
      {
        name: "VENTA",
        fields: [
          "*Nro._Vendedor",
          "*Nro._Cliente",
          "Nro._Almacén",
          "Monto"
        ]
      },
      {
        name: "ALMACEN",
        fields: [
          "*Nro._Almacén"
        ]
      }
    ],
    connections: [
      "VENTA.Nro._Vendedor ➔ VENDEDOR.Nro._Vendedor",
      "VENTA.Nro._Cliente ➔ CLIENTE.Nro._Cliente",
      "VENTA.Nro._Almacén ➔ ALMACEN.Nro._Almacén"
    ],
    comparison: `
      <div class="glass-callout">
        <h4>Comparación Académica vs. Industrial</h4>
        <p><strong>Académico:</strong> Dado que el vendedor trabaja en un área de ventas específica y los clientes son únicos, la 3FN aísla al Vendedor, al Cliente y la Venta con claves compuestas.</p>
        <p><strong>Industrial:</strong> Un modelo comercial real incluye un número de factura como clave principal única de la venta, con relaciones estructuradas hacia las dimensiones de vendedor, almacén y cliente.</p>
      </div>
    `,
    erDiagram: `
      <svg id="er-diagram-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" width="100%" height="100%">
        <!-- == Fila Superior (y=60) == -->
        <g class="svg-entity" tabindex="0">
          <rect x="155" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="210" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">VENDEDOR</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="365" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="420" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">ALMACEN</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="575" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="630" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">CLIENTE</text>
        </g>

        <!-- == Fila Inferior - Tabla Intermediaria (y=420) == -->
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="355" y="420" width="130" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="359" y="424" width="122" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="420" y="445" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">VENTA</text>
        </g>

        <!-- == Rombos y Conexiones == -->
        <!-- Realiza: VENDEDOR ↔ VENTA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="210,215 240,240 210,265 180,240" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="210" y="244" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Realiza</text>
        </g>
        <line x1="210" y1="100" x2="210" y2="215" stroke="#64748b" stroke-width="1.5" />
        <line x1="210" y1="265" x2="365" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="220" y="125" fill="#f43f5e" font-size="11">N</text>
        <text x="220" y="285" fill="#f43f5e" font-size="11">1</text>

        <!-- Despacha: ALMACEN ↔ VENTA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="420,215 450,240 420,265 390,240" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="420" y="244" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Despacha</text>
        </g>
        <line x1="420" y1="100" x2="420" y2="215" stroke="#64748b" stroke-width="1.5" />
        <line x1="420" y1="265" x2="420" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="430" y="125" fill="#f43f5e" font-size="11">P</text>
        <text x="430" y="285" fill="#f43f5e" font-size="11">1</text>

        <!-- Solicita: CLIENTE ↔ VENTA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="630,215 660,240 630,265 600,240" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="630" y="244" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Solicita</text>
        </g>
        <line x1="630" y1="100" x2="630" y2="215" stroke="#64748b" stroke-width="1.5" />
        <line x1="630" y1="265" x2="475" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="640" y="125" fill="#f43f5e" font-size="11">M</text>
        <text x="610" y="285" fill="#f43f5e" font-size="11">1</text>

        <!-- == Elipses de clave primaria == -->
        <g class="svg-attribute">
          <ellipse cx="210" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="210" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">NroVendedor</text>
          <line x1="210" y1="35" x2="210" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="420" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="420" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">NroAlmacen</text>
          <line x1="420" y1="35" x2="420" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="630" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="630" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">NroCliente</text>
          <line x1="630" y1="35" x2="630" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
      </svg>
    `
  },
  {
    id: 7,
    title: "7. Centro de Investigación",
    description: "Control de personal de investigadores, profesiones y asignaciones de cursos dictados y administrados.",
    content1nf: `
      <h3>Primera Forma Normal (1NF) - Centro de Investigación</h3>
      <p>Garantizar atomicidad en los campos de especialidad y teléfono del personal científico. Descomposición de nombres obligatoria.</p>
    `,
    content2nf: `
      <h3>Segunda Forma Normal (2NF) - Centro de Investigación</h3>
      <p>Eliminación de redundancia de información de proyectos sobre la asignación del investigador y cursos abiertos.</p>
    `,
    content3nf: `
      <h3>Tercera Forma Normal (3NF) - Centro de Investigación</h3>
      <p>Bajo la 3NF, resolvemos la dependencia transitiva presente: los datos del proyecto y del supervisor, así como la ubicación de la sede, dependen de los códigos identificadores correspondientes del investigador.</p>
    `,
    tables1nf: [
      {
        name: "CENTRO_INVESTIGACION_COMPLETO",
        fields: [
          "*C.I._Empleado",
          "Nombres_Empleado",
          "Apellidos_Empleado",
          "Profesión",
          "Nivel_Preparación",
          "Área_Preparación",
          "*Código_Curso",
          "Horario_Curso",
          "Máx_Participantes",
          "C.I._Administrador",
          "*C.I._Participante",
          "Nombres_Participante",
          "Apellidos_Participante"
        ]
      }
    ],
    tables2nf: [
      {
        name: "EMPLEADO",
        fields: [
          "*C.I._Empleado",
          "Nombres_Empleado",
          "Apellidos_Empleado"
        ]
      },
      {
        name: "EMPLEADO_PROFESION",
        fields: [
          "*C.I._Empleado",
          "*Profesión"
        ]
      },
      {
        name: "EMPLEADO_PREPARACION",
        fields: [
          "*C.I._Empleado",
          "*Nivel_Preparación",
          "Área_Preparación"
        ]
      },
      {
        name: "APERTURA_CURSO",
        fields: [
          "*Código_Curso",
          "Horario_Curso",
          "Máx_Participantes",
          "C.I._Administrador"
        ]
      },
      {
        name: "PARTICIPANTE",
        fields: [
          "*C.I._Participante",
          "Nombres_Participante",
          "Apellidos_Participante"
        ]
      },
      {
        name: "INSCRIPCION",
        fields: [
          "*Código_Curso",
          "*C.I._Participante"
        ]
      }
    ],
    tables3nf: [
      {
        name: "EMPLEADO",
        fields: [
          "*C.I._Empleado",
          "Nombres",
          "Apellidos"
        ]
      },
      {
        name: "EMPLEADO_PROFESION",
        fields: [
          "*C.I._Empleado",
          "*Profesión"
        ]
      },
      {
        name: "EMPLEADO_PREPARACION",
        fields: [
          "*C.I._Empleado",
          "*Nivel_Preparación",
          "Área_Preparación"
        ]
      },
      {
        name: "CURSO",
        fields: [
          "*Código_Curso"
        ]
      },
      {
        name: "APERTURA_CURSO",
        fields: [
          "*Código_Curso",
          "Horario_Curso",
          "Máx_Participantes",
          "C.I._Administrador"
        ]
      },
      {
        name: "PARTICIPANTE",
        fields: [
          "*C.I._Participante",
          "Nombres",
          "Apellidos"
        ]
      },
      {
        name: "INSCRIPCION",
        fields: [
          "*Código_Curso",
          "*C.I._Participante"
        ]
      }
    ],
    connections: [
      "EMPLEADO_PROFESION.C.I._Empleado ➔ EMPLEADO.C.I._Empleado",
      "EMPLEADO_PREPARACION.C.I._Empleado ➔ EMPLEADO.C.I._Empleado",
      "APERTURA_CURSO.Código_Curso ➔ CURSO.Código_Curso",
      "APERTURA_CURSO.C.I._Administrador ➔ EMPLEADO.C.I._Empleado",
      "INSCRIPCION.Código_Curso ➔ APERTURA_CURSO.Código_Curso",
      "INSCRIPCION.C.I._Participante ➔ PARTICIPANTE.C.I._Participante"
    ],
    comparison: `
      <div class="glass-callout">
        <h4>Comparación Académica vs. Industrial</h4>
        <p><strong>Académico:</strong> Dado que un empleado puede tener varias profesiones y postgrados, se normaliza en tablas multivaloradas independientes. La administración del curso por parte del empleado genera dependencias.</p>
        <p><strong>Industrial:</strong> Las profesiones de los empleados usualmente se registran en un catálogo maestro codificado para evitar errores de escritura y agilizar las búsquedas.</p>
      </div>
    `,
    erDiagram: `
      <svg id="er-diagram-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" width="100%" height="100%">
        <!-- == Fila Superior (y=60) == -->
        <g class="svg-entity" tabindex="0">
          <rect x="105" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="160" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">EMPLEADO</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="365" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="420" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">CURSO</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="645" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="700" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">PARTICIPANTE</text>
        </g>

        <!-- == Fila Media (y=240) == -->
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="355" y="240" width="130" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="359" y="244" width="122" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="420" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">APERTURA_CURSO</text>
        </g>

        <!-- == Fila Inferior - Tablas Intermediarias y Débiles (y=420) == -->
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="20" y="420" width="120" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="24" y="424" width="112" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="80" y="445" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">EMP_PROFESION</text>
        </g>
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="180" y="420" width="120" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="184" y="424" width="112" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="240" y="445" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">EMP_PREPARACION</text>
        </g>
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="500" y="420" width="120" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="504" y="424" width="112" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="560" y="445" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">INSCRIPCION</text>
        </g>

        <!-- == Rombos y Conexiones == -->
        <!-- TieneProf -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="120,235 150,260 120,285 90,260" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="120" y="264" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">TieneProf</text>
        </g>
        <line x1="160" y1="100" x2="120" y2="235" stroke="#64748b" stroke-width="1.5" />
        <line x1="120" y1="285" x2="80" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="145" y="125" fill="#f43f5e" font-size="11">1</text>
        <text x="105" y="410" fill="#f43f5e" font-size="11">M</text>

        <!-- TienePrep -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="200,235 230,260 200,285 170,260" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="200" y="264" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">TienePrep</text>
        </g>
        <line x1="160" y1="100" x2="200" y2="235" stroke="#64748b" stroke-width="1.5" />
        <line x1="200" y1="285" x2="240" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="175" y="125" fill="#f43f5e" font-size="11">1</text>
        <text x="215" y="410" fill="#f43f5e" font-size="11">M</text>

        <!-- Administra -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="290,145 320,170 290,195 260,170" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="290" y="174" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Administra</text>
        </g>
        <line x1="160" y1="100" x2="290" y2="145" stroke="#64748b" stroke-width="1.5" />
        <line x1="290" y1="195" x2="355" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="180" y="115" fill="#f43f5e" font-size="11">1</text>
        <text x="335" y="230" fill="#f43f5e" font-size="11">N</text>

        <!-- Abre -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="420,145 450,170 420,195 390,170" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="420" y="174" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Abre</text>
        </g>
        <line x1="420" y1="100" x2="420" y2="145" stroke="#64748b" stroke-width="1.5" />
        <line x1="420" y1="195" x2="420" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="430" y="125" fill="#f43f5e" font-size="11">1</text>
        <text x="430" y="225" fill="#f43f5e" font-size="11">1</text>

        <!-- Registra -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="490,325 520,350 490,375 460,350" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="490" y="354" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Registra</text>
        </g>
        <line x1="420" y1="280" x2="490" y2="325" stroke="#64748b" stroke-width="1.5" />
        <line x1="490" y1="375" x2="560" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="440" y="300" fill="#f43f5e" font-size="11">N</text>
        <text x="540" y="410" fill="#f43f5e" font-size="11">1</text>

        <!-- Aplica -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="630,235 660,260 630,285 600,260" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="630" y="264" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Aplica</text>
        </g>
        <line x1="700" y1="100" x2="630" y2="235" stroke="#64748b" stroke-width="1.5" />
        <line x1="630" y1="285" x2="560" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="680" y="125" fill="#f43f5e" font-size="11">M</text>
        <text x="580" y="410" fill="#f43f5e" font-size="11">1</text>

        <!-- == Elipses de clave primaria == -->
        <g class="svg-attribute">
          <ellipse cx="160" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="160" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CI_Emp</text>
          <line x1="160" y1="35" x2="160" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="420" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="420" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CodCurso</text>
          <line x1="420" y1="35" x2="420" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="700" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="700" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CI_Part</text>
          <line x1="700" y1="35" x2="700" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
      </svg>
    `
  },
  {
    id: 8,
    title: "8. Transacciones Bancarias",
    description: "Automatización de control de depósitos, retiros y transferencias en cuentas bancarias corrientes, de ahorro y activos líquidos.",
    content1nf: `
      <h3>Primera Forma Normal (1NF) - Transacciones Bancarias</h3>
      <p>Atomización de transacciones, fechas e importes para garantizar la primera forma normal.</p>
    `,
    content2nf: `
      <h3>Segunda Forma Normal (2NF) - Transacciones Bancarias</h3>
      <p>Relación de cuentas y depósitos asociadas al cliente bancario.</p>
    `,
    content3nf: `
      <h3>Tercera Forma Normal (3NF) - Transacciones Bancarias</h3>
      <p>Sucursales y firmas de cheques eliminadas de la tabla de transacción para evitar anomalías transitivas.</p>
    `,
    tables1nf: [
      {
        name: "BANCO_PLANILLA_UNICA",
        fields: [
          "*Nro._Transacción",
          "C.I._Cliente",
          "Nombres_Cliente",
          "Apellidos_Cliente",
          "Nro_Cuenta",
          "Tipo_Cuenta",
          "Saldo_Total",
          "Saldo_Disponible",
          "Monto_Efectivo",
          "Monto_Cheque",
          "Nro_Cheque",
          "Banco_Emisor",
          "Nro_Folio_Libreta",
          "Fecha_Transacción",
          "Hora_Transacción"
        ]
      }
    ],
    tables2nf: [
      {
        name: "CLIENTE",
        fields: [
          "*C.I._Cliente",
          "Nombres_Cliente",
          "Apellidos_Cliente"
        ]
      },
      {
        name: "CUENTA",
        fields: [
          "*Nro_Cuenta",
          "C.I._Cliente",
          "Tipo_Cuenta",
          "Saldo_Total",
          "Saldo_Disponible"
        ]
      },
      {
        name: "TRANSACCION",
        fields: [
          "*Nro._Transacción",
          "Nro_Cuenta",
          "Fecha_Transacción",
          "Hora_Transacción"
        ]
      },
      {
        name: "DETALLE_DEPÓSITO",
        fields: [
          "*Nro._Transacción",
          "Monto_Efectivo",
          "Monto_Cheque"
        ]
      },
      {
        name: "RETIRO_CHEQUE",
        fields: [
          "*Nro._Transacción",
          "Nro_Cheque",
          "Banco_Emisor"
        ]
      },
      {
        name: "RETIRO_LIBRETA",
        fields: [
          "*Nro._Transacción",
          "Nro_Folio_Libreta"
        ]
      }
    ],
    tables3nf: [
      {
        name: "CLIENTE",
        fields: [
          "*C.I._Cliente",
          "Nombres",
          "Apellidos"
        ]
      },
      {
        name: "CUENTA",
        fields: [
          "*Nro_Cuenta",
          "C.I._Cliente",
          "Tipo_Cuenta",
          "Saldo_Total",
          "Saldo_Disponible"
        ]
      },
      {
        name: "TRANSACCION",
        fields: [
          "*Nro._Transacción",
          "Nro_Cuenta",
          "Fecha_Transacción",
          "Hora_Transacción"
        ]
      },
      {
        name: "DETALLE_DEPÓSITO",
        fields: [
          "*Nro._Transacción",
          "Monto_Efectivo",
          "Monto_Cheque"
        ]
      },
      {
        name: "RETIRO_CHEQUE",
        fields: [
          "*Nro._Transacción",
          "Nro_Cheque",
          "Banco_Emisor"
        ]
      },
      {
        name: "RETIRO_LIBRETA",
        fields: [
          "*Nro._Transacción",
          "Nro_Folio_Libreta"
        ]
      }
    ],
    connections: [
      "CUENTA.C.I._Cliente ➔ CLIENTE.C.I._Cliente",
      "TRANSACCION.Nro_Cuenta ➔ CUENTA.Nro_Cuenta",
      "DETALLE_DEPÓSITO.Nro._Transacción ➔ TRANSACCION.Nro._Transacción",
      "RETIRO_CHEQUE.Nro._Transacción ➔ TRANSACCION.Nro._Transacción",
      "RETIRO_LIBRETA.Nro._Transacción ➔ TRANSACCION.Nro._Transacción"
    ],
    comparison: `
      <div class="glass-callout">
        <h4>Comparación Académica vs. Industrial</h4>
        <p><strong>Académico:</strong> Los saldos totales y disponibles se guardan en la cuenta considerando la política espacio vs tiempo. Los detalles del retiro (cheque/libreta) se modelan en tablas separadas en 3FN.</p>
        <p><strong>Industrial:</strong> Se manejan saldos históricos recalculables en tiempo real y transacciones inmutables para cumplir con auditorías bancarias estrictas.</p>
      </div>
    `,
    erDiagram: `
      <svg id="er-diagram-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 400" width="100%" height="100%">
        <!-- == Fila Superior (y=60) == -->
        <g class="svg-entity" tabindex="0">
          <rect x="155" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="210" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">CLIENTE</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="365" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="420" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">CUENTA</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="575" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="630" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">TRANSACCION</text>
        </g>

        <!-- == Fila Inferior - Tablas Débiles (y=240) == -->
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="355" y="240" width="130" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="359" y="244" width="122" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="420" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">DETALLE_DEPOSITO</text>
        </g>
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="565" y="240" width="130" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="569" y="244" width="122" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="630" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">RETIRO_CHEQUE</text>
        </g>
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="775" y="240" width="130" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="779" y="244" width="122" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="840" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">RETIRO_LIBRETA</text>
        </g>

        <!-- == Rombos y Conexiones == -->
        <!-- Posee: CLIENTE ↔ CUENTA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="315,55 345,80 315,105 285,80" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="315" y="84" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Posee</text>
        </g>
        <line x1="265" y1="80" x2="285" y2="80" stroke="#64748b" stroke-width="1.5" />
        <line x1="345" y1="80" x2="365" y2="80" stroke="#64748b" stroke-width="1.5" />
        <text x="270" y="72" fill="#f43f5e" font-size="11">1</text>
        <text x="355" y="72" fill="#f43f5e" font-size="11">N</text>

        <!-- Registra: CUENTA ↔ TRANSACCION -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="525,55 555,80 525,105 495,80" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="525" y="84" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Registra</text>
        </g>
        <line x1="475" y1="80" x2="495" y2="80" stroke="#64748b" stroke-width="1.5" />
        <line x1="555" y1="80" x2="575" y2="80" stroke="#64748b" stroke-width="1.5" />
        <text x="480" y="72" fill="#f43f5e" font-size="11">1</text>
        <text x="565" y="72" fill="#f43f5e" font-size="11">N</text>

        <!-- Es (Detalle Deposito) -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="525,145 555,170 525,195 495,170" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="525" y="174" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Es</text>
        </g>
        <line x1="600" y1="100" x2="525" y2="145" stroke="#64748b" stroke-width="1.5" />
        <line x1="525" y1="195" x2="450" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="560" y="115" fill="#f43f5e" font-size="11">1</text>
        <text x="490" y="235" fill="#f43f5e" font-size="11">1</text>

        <!-- Es (Retiro Cheque) -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="630,145 660,170 630,195 600,170" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="630" y="174" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Es</text>
        </g>
        <line x1="630" y1="100" x2="630" y2="145" stroke="#64748b" stroke-width="1.5" />
        <line x1="630" y1="195" x2="630" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="640" y="125" fill="#f43f5e" font-size="11">1</text>
        <text x="640" y="225" fill="#f43f5e" font-size="11">1</text>

        <!-- Es (Retiro Libreta) -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="735,145 765,170 735,195 705,170" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="735" y="174" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Es</text>
        </g>
        <line x1="660" y1="100" x2="735" y2="145" stroke="#64748b" stroke-width="1.5" />
        <line x1="735" y1="195" x2="810" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="700" y="115" fill="#f43f5e" font-size="11">1</text>
        <text x="770" y="235" fill="#f43f5e" font-size="11">1</text>

        <!-- == Elipses de clave primaria == -->
        <g class="svg-attribute">
          <ellipse cx="210" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="210" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CI</text>
          <line x1="210" y1="35" x2="210" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="420" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="420" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">NroCuenta</text>
          <line x1="420" y1="35" x2="420" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="630" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="630" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">NroTrans</text>
          <line x1="630" y1="35" x2="630" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
      </svg>
    `
  },
  {
    id: 9,
    title: "9. Pedidos de Supermercado",
    description: "Gestión de pedidos de compras al contado a proveedores de diferentes marcas y presentaciones de productos por departamento.",
    content1nf: `
      <h3>Primera Forma Normal (1NF) - Pedidos</h3>
      <p>Atomización de la planilla de pedido y datos de proveedores.</p>
    `,
    content2nf: `
      <h3>Segunda Forma Normal (2NF) - Pedidos</h3>
      <p>Separación del producto y proveedor en este paso para resolver dependencias funcionales parciales.</p>
    `,
    content3nf: `
      <h3>Tercera Forma Normal (3NF) - Pedidos</h3>
      <p>Precios y marcas resueltos en catálogos separados.</p>
    `,
    tables1nf: [
      {
        name: "PEDIDOS_SUPERMERCADO_COMPLETO",
        fields: [
          "*PEDIDO_Nro.",
          "Código_Proveedor",
          "Nombre_del_Proveedor",
          "Dirección_del_Proveedor",
          "RIF_Proveedor",
          "Tlf_Proveedor",
          "Fecha_Pedido",
          "Código_Producto",
          "Descripción_Producto",
          "Marca_Producto",
          "Presentación_Producto",
          "Departamento_Producto",
          "Cantidad",
          "Precio",
          "Sub_Total",
          "Total_Bs._pedido"
        ]
      }
    ],
    tables2nf: [
      {
        name: "PROVEEDOR",
        fields: [
          "*Código_Proveedor",
          "Nombre_del_Proveedor",
          "Dirección_del_Proveedor",
          "RIF_Proveedor",
          "Tlf_Proveedor"
        ]
      },
      {
        name: "PEDIDO",
        fields: [
          "*PEDIDO_Nro.",
          "Código_Proveedor",
          "Fecha_Pedido",
          "Total_Bs._pedido"
        ]
      },
      {
        name: "PRODUCTO_DETALLE",
        fields: [
          "*PEDIDO_Nro.",
          "*Código_Producto",
          "Descripción_Producto",
          "Marca_Producto",
          "Presentación_Producto",
          "Departamento_Producto",
          "Cantidad",
          "Precio",
          "Sub_Total"
        ]
      }
    ],
    tables3nf: [
      {
        name: "PROVEEDOR",
        fields: [
          "*Código_Proveedor",
          "Nombre_del_Proveedor",
          "Dirección_del_Proveedor",
          "RIF_Proveedor",
          "Tlf_Proveedor"
        ]
      },
      {
        name: "PRODUCTO",
        fields: [
          "*Código_Producto",
          "Descripción_Producto",
          "Marca_Producto",
          "Presentación_Producto",
          "Departamento_Producto"
        ]
      },
      {
        name: "PEDIDO",
        fields: [
          "*PEDIDO_Nro.",
          "Código_Proveedor",
          "Fecha_Pedido",
          "Total_Bs._pedido"
        ]
      },
      {
        name: "DETALLE_PEDIDO",
        fields: [
          "*PEDIDO_Nro.",
          "*Código_Producto",
          "Cantidad",
          "Precio",
          "Sub_Total"
        ]
      }
    ],
    connections: [
      "PEDIDO.Código_Proveedor ➔ PROVEEDOR.Código_Proveedor",
      "DETALLE_PEDIDO.PEDIDO_Nro. ➔ PEDIDO.PEDIDO_Nro.",
      "DETALLE_PEDIDO.Código_Producto ➔ PRODUCTO.Código_Producto"
    ],
    comparison: `
      <div class="glass-callout">
        <h4>Comparación Académica vs. Industrial</h4>
        <p><strong>Académico:</strong> Se normalizan los datos de producto y proveedor de forma directa. Los totales se evalúan para almacenamiento por conveniencia de tiempo de consulta.</p>
        <p><strong>Industrial:</strong> Las marcas y departamentos del producto se extraen a catálogos independientes en 3FN para optimizar búsquedas industriales estructuradas.</p>
      </div>
    `,
    erDiagram: `
      <svg id="er-diagram-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" width="100%" height="100%">
        <!-- == Fila Superior (y=60) == -->
        <g class="svg-entity" tabindex="0">
          <rect x="155" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="210" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">PROVEEDOR</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="365" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="420" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">PEDIDO</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="645" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="700" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">PRODUCTO</text>
        </g>

        <!-- == Fila Inferior - Tabla Intermediaria (y=420) == -->
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="495" y="420" width="130" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="499" y="424" width="122" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="560" y="445" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">DETALLE_PEDIDO</text>
        </g>

        <!-- == Rombos y Conexiones == -->
        <!-- Recibe: PROVEEDOR ↔ PEDIDO -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="315,55 345,80 315,105 285,80" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="315" y="84" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Recibe</text>
        </g>
        <line x1="265" y1="80" x2="285" y2="80" stroke="#64748b" stroke-width="1.5" />
        <line x1="345" y1="80" x2="365" y2="80" stroke="#64748b" stroke-width="1.5" />
        <text x="270" y="72" fill="#f43f5e" font-size="11">1</text>
        <text x="355" y="72" fill="#f43f5e" font-size="11">N</text>

        <!-- Contiene: PEDIDO ↔ DETALLE_PEDIDO -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="420,215 450,240 420,265 390,240" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="420" y="244" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Contiene</text>
        </g>
        <line x1="420" y1="100" x2="420" y2="215" stroke="#64748b" stroke-width="1.5" />
        <line x1="420" y1="265" x2="500" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="430" y="125" fill="#f43f5e" font-size="11">N</text>
        <text x="430" y="285" fill="#f43f5e" font-size="11">1</text>

        <!-- Abarca: PRODUCTO ↔ DETALLE_PEDIDO -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="700,215 730,240 700,265 670,240" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="700" y="244" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Abarca</text>
        </g>
        <line x1="700" y1="100" x2="700" y2="215" stroke="#64748b" stroke-width="1.5" />
        <line x1="700" y1="265" x2="620" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="710" y="125" fill="#f43f5e" font-size="11">M</text>
        <text x="690" y="285" fill="#f43f5e" font-size="11">1</text>

        <!-- == Elipses de clave primaria == -->
        <g class="svg-attribute">
          <ellipse cx="210" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="210" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CodProve</text>
          <line x1="210" y1="35" x2="210" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="420" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="420" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">NroPedido</text>
          <line x1="420" y1="35" x2="420" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="700" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="700" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CodProd</text>
          <line x1="700" y1="35" x2="700" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
      </svg>
    `
  },
  {
    id: 10,
    title: "10. Mantenimiento de Aeronaves",
    description: "Diseño para un Sistema de Información de Mantenimiento de Aviones con asignación de talleres autorizados, jefes y mecánicos por ciudad.",
    content1nf: `
      <h3>Primera Forma Normal (1NF) - Aviones</h3>
      <p>Historiales de mantenimiento y talleres atómicos para cumplir con la primera forma normal.</p>
    `,
    content2nf: `
      <h3>Segunda Forma Normal (2NF) - Aviones</h3>
      <p>Procesos de mantenimiento y talleres con dependencias de áreas funcionales resueltas.</p>
    `,
    content3nf: `
      <h3>Tercera Forma Normal (3NF) - Aviones</h3>
      <p>Especialidades mecánicas separadas del mecánico individual para evitar redundancia.</p>
    `,
    tables1nf: [
      {
        name: "MANTENIMIENTO_AVIONES_COMPLETO",
        fields: [
          "*Tipo_de_Avión",
          "Capacidad_de_Pasajeros",
          "*Código_del_proceso_mantenimiento",
          "Duración_del_proceso_mantenimiento",
          "Frecuencia_del_proceso_mantenimiento",
          "Precio_Mantenimiento",
          "*Código_del_mecánico",
          "Nombre_Mecánico",
          "*Número_del_taller_mantenimiento",
          "Jefe_del_taller_mantenimiento",
          "*Ciudad_mantenimiento",
          "Gerente_mantenimiento_ciudad",
          "*Fecha_proceso_mantenimiento",
          "Siguiente_fecha_proceso"
        ]
      }
    ],
    tables2nf: [
      {
        name: "AVION_TIPO",
        fields: [
          "*Tipo_de_Avión",
          "Capacidad_de_Pasajeros"
        ]
      },
      {
        name: "PROCESO_MANTENIMIENTO",
        fields: [
          "*Código_del_proceso_mantenimiento",
          "Duración_del_proceso_mantenimiento",
          "Frecuencia_del_proceso_mantenimiento",
          "Precio_Mantenimiento"
        ]
      },
      {
        name: "CIUDAD",
        fields: [
          "*Ciudad_mantenimiento",
          "Gerente_mantenimiento_ciudad"
        ]
      },
      {
        name: "TALLER",
        fields: [
          "*Número_del_taller_mantenimiento",
          "Jefe_del_taller_mantenimiento",
          "Ciudad_mantenimiento"
        ]
      },
      {
        name: "MECANICO",
        fields: [
          "*Código_del_mecánico",
          "Nombre_Mecánico",
          "Número_del_taller_mantenimiento"
        ]
      },
      {
        name: "REGISTRO_SERVICIO",
        fields: [
          "*Tipo_de_Avión",
          "*Código_del_proceso_mantenimiento",
          "*Número_del_taller_mantenimiento",
          "*Código_del_mecánico",
          "*Fecha_proceso_mantenimiento",
          "Siguiente_fecha_proceso"
        ]
      }
    ],
    tables3nf: [
      {
        name: "AVION_TIPO",
        fields: [
          "*Tipo_de_Avión",
          "Capacidad_de_Pasajeros"
        ]
      },
      {
        name: "PROCESO_MANTENIMIENTO",
        fields: [
          "*Código_del_proceso_mantenimiento",
          "Duración_del_proceso_mantenimiento",
          "Frecuencia_del_proceso_mantenimiento",
          "Precio_Mantenimiento"
        ]
      },
      {
        name: "CIUDAD",
        fields: [
          "*Ciudad_mantenimiento",
          "Gerente_mantenimiento_ciudad"
        ]
      },
      {
        name: "TALLER",
        fields: [
          "*Número_del_taller_mantenimiento",
          "Jefe_del_taller_mantenimiento",
          "Ciudad_mantenimiento"
        ]
      },
      {
        name: "MECANICO",
        fields: [
          "*Código_del_mecánico",
          "Nombre_Mecánico",
          "Número_del_taller_mantenimiento"
        ]
      },
      {
        name: "REGISTRO_SERVICIO",
        fields: [
          "*Tipo_de_Avión",
          "*Código_del_proceso_mantenimiento",
          "*Número_del_taller_mantenimiento",
          "*Código_del_mecánico",
          "*Fecha_proceso_mantenimiento",
          "Siguiente_fecha_proceso"
        ]
      }
    ],
    connections: [
      "TALLER.Ciudad_mantenimiento ➔ CIUDAD.Ciudad_mantenimiento",
      "MECANICO.Número_del_taller_mantenimiento ➔ TALLER.Número_del_taller_mantenimiento",
      "REGISTRO_SERVICIO.Tipo_de_Avión ➔ AVION_TIPO.Tipo_de_Avión",
      "REGISTRO_SERVICIO.Código_del_proceso_mantenimiento ➔ PROCESO_MANTENIMIENTO.Código_del_proceso_mantenimiento",
      "REGISTRO_SERVICIO.Número_del_taller_mantenimiento ➔ TALLER.Número_del_taller_mantenimiento",
      "REGISTRO_SERVICIO.Código_del_mecánico ➔ MECANICO.Código_del_mecánico"
    ],
    comparison: `
      <div class="glass-callout">
        <h4>Comparación Académica vs. Industrial</h4>
        <p><strong>Académico:</strong> Se modela una sola relación para el registro del servicio del avión. Las llaves compuestas identifican cada paso del servicio realizado.</p>
        <p><strong>Industrial:</strong> Un sistema real implementa IDs de avión individuales (nros de cola) y tickets de mantenimiento estructurados en bases de datos con control de firmas digitales.</p>
      </div>
    `,
    erDiagram: `
      <svg id="er-diagram-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 500" width="100%" height="100%">
        <!-- == CIUDAD (y=40) == -->
        <g class="svg-entity" tabindex="0">
          <rect x="535" y="40" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="590" y="65" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">CIUDAD</text>
        </g>

        <!-- == Fila Media (y=160) == -->
        <g class="svg-entity" tabindex="0">
          <rect x="95" y="160" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="150" y="185" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">AVION_TIPO</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="315" y="160" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="370" y="185" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">PROCESO</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="535" y="160" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="590" y="185" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">TALLER</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="755" y="160" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="810" y="185" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">MECANICO</text>
        </g>

        <!-- == Fila Inferior - Tabla Intermediaria Múltiple (y=420) == -->
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="400" y="420" width="160" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="404" y="424" width="152" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="480" y="445" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">REGISTRO_SERVICIO</text>
        </g>

        <!-- == Rombos y Conexiones == -->
        <!-- Ubicado: CIUDAD ↔ TALLER -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="590,95 620,120 590,145 560,120" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="590" y="124" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Ubicado</text>
        </g>
        <line x1="590" y1="80" x2="590" y2="95" stroke="#64748b" stroke-width="1.5" />
        <line x1="590" y1="145" x2="590" y2="160" stroke="#64748b" stroke-width="1.5" />
        <text x="600" y="90" fill="#f43f5e" font-size="11">1</text>
        <text x="600" y="155" fill="#f43f5e" font-size="11">N</text>

        <!-- Trabaja: TALLER ↔ MECANICO -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="700,155 730,180 700,205 670,180" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="700" y="184" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Trabaja</text>
        </g>
        <line x1="645" y1="180" x2="670" y2="180" stroke="#64748b" stroke-width="1.5" />
        <line x1="730" y1="180" x2="755" y2="180" stroke="#64748b" stroke-width="1.5" />
        <text x="655" y="172" fill="#f43f5e" font-size="11">1</text>
        <text x="740" y="172" fill="#f43f5e" font-size="11">N</text>

        <!-- De: AVION ↔ REGISTRO -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="285,275 315,300 285,325 255,300" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="285" y="304" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">De</text>
        </g>
        <line x1="150" y1="200" x2="285" y2="275" stroke="#64748b" stroke-width="1.5" />
        <line x1="285" y1="325" x2="420" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="160" y="225" fill="#f43f5e" font-size="11">N</text>
        <text x="405" y="410" fill="#f43f5e" font-size="11">1</text>

        <!-- Usa: PROCESO ↔ REGISTRO -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="415,275 445,300 415,325 385,300" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="415" y="304" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Usa</text>
        </g>
        <line x1="370" y1="200" x2="415" y2="275" stroke="#64748b" stroke-width="1.5" />
        <line x1="415" y1="325" x2="460" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="360" y="225" fill="#f43f5e" font-size="11">M</text>
        <text x="445" y="410" fill="#f43f5e" font-size="11">1</text>

        <!-- En: TALLER ↔ REGISTRO -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="545,275 575,300 545,325 515,300" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="545" y="304" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">En</text>
        </g>
        <line x1="590" y1="200" x2="545" y2="275" stroke="#64748b" stroke-width="1.5" />
        <line x1="545" y1="325" x2="500" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="595" y="225" fill="#f43f5e" font-size="11">P</text>
        <text x="515" y="410" fill="#f43f5e" font-size="11">1</text>

        <!-- Por: MECANICO ↔ REGISTRO -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="675,275 705,300 675,325 645,300" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="675" y="304" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Por</text>
        </g>
        <line x1="810" y1="200" x2="675" y2="275" stroke="#64748b" stroke-width="1.5" />
        <line x1="675" y1="325" x2="540" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="815" y="225" fill="#f43f5e" font-size="11">Q</text>
        <text x="555" y="410" fill="#f43f5e" font-size="11">1</text>

        <!-- == Elipses de clave primaria == -->
        <g class="svg-attribute">
          <ellipse cx="690" cy="60" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="690" y="64" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Ciudad</text>
          <line x1="645" y1="60" x2="655" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="150" cy="115" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="150" y="119" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">TipoAvion</text>
          <line x1="150" y1="130" x2="150" y2="160" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="370" cy="115" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="370" y="119" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CodProceso</text>
          <line x1="370" y1="130" x2="370" y2="160" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="465" cy="180" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="465" y="184" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">NroTaller</text>
          <line x1="500" y1="180" x2="535" y2="180" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="810" cy="115" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="810" y="119" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CodMecanico</text>
          <line x1="810" y1="130" x2="810" y2="160" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
      </svg>
    `
  },
  {
    id: 11,
    title: "11. Reparación de Electrodomésticos",
    description: "Control de técnicos de servicio a domicilio, órdenes de reparación de aparatos, especialidades y registro de clientes.",
    content1nf: `
      <h3>Primera Forma Normal (1NF) - Reparaciones</h3>
      <p>Atomización de fallas y datos de clientes para cumplir con la primera forma normal de bases de datos.</p>
    `,
    content2nf: `
      <h3>Segunda Forma Normal (2NF) - Reparaciones</h3>
      <p>Separación de técnicos y repuestos. Se eliminan las dependencias funcionales parciales.</p>
    `,
    content3nf: `
      <h3>Tercera Forma Normal (3NF) - Reparaciones</h3>
      <p>Garantías y marcas resueltas en tablas independientes para cumplir con la tercera forma normal.</p>
    `,
    tables1nf: [
      {
        name: "REPARACION_ELECTRODOMESTICOS_COMPLETO",
        fields: [
          "*Serial_Electrodoméstico",
          "Tipo_de_Electrodoméstico",
          "Años_de_garantía",
          "Nombre_del_Cliente",
          "Dirección_del_Cliente",
          "*Número_del_Técnico",
          "Nombre_Técnico",
          "Años_experiencia_tipo",
          "Costo_hora_servicio_tipo",
          "Estado_de_servicio",
          "Nivel_educación",
          "*Fecha_del_servicio",
          "Horas_servicio"
        ]
      }
    ],
    tables2nf: [
      {
        name: "CLIENTE",
        fields: [
          "*Nombre_del_Cliente",
          "Dirección_del_Cliente"
        ]
      },
      {
        name: "ELECTRODOMESTICO",
        fields: [
          "*Serial_Electrodoméstico",
          "Tipo_de_Electrodoméstico",
          "Años_de_garantía",
          "Nombre_del_Cliente"
        ]
      },
      {
        name: "TECNICO",
        fields: [
          "*Número_del_Técnico",
          "Nombre_Técnico",
          "Estado_de_servicio",
          "Nivel_educación"
        ]
      },
      {
        name: "TECNICO_EXPERIENCIA",
        fields: [
          "*Número_del_Técnico",
          "*Tipo_de_Electrodoméstico",
          "Años_experiencia_tipo",
          "Costo_hora_servicio_tipo"
        ]
      },
      {
        name: "REGISTRO_REPARACION",
        fields: [
          "*Serial_Electrodoméstico",
          "*Número_del_Técnico",
          "*Fecha_del_servicio",
          "Horas_servicio"
        ]
      }
    ],
    tables3nf: [
      {
        name: "CLIENTE",
        fields: [
          "*Nombre_del_Cliente",
          "Dirección_del_Cliente"
        ]
      },
      {
        name: "ELECTRODOMESTICO",
        fields: [
          "*Serial_Electrodoméstico",
          "Tipo_de_Electrodoméstico",
          "Años_de_garantía",
          "Nombre_del_Cliente"
        ]
      },
      {
        name: "TECNICO",
        fields: [
          "*Número_del_Técnico",
          "Nombre_Técnico",
          "Estado_de_servicio",
          "Nivel_educación"
        ]
      },
      {
        name: "TIPO_EQUIPO",
        fields: [
          "*Tipo_de_Electrodoméstico",
          "Costo_hora_servicio_tipo"
        ]
      },
      {
        name: "TECNICO_EXPERIENCIA",
        fields: [
          "*Número_del_Técnico",
          "*Tipo_de_Electrodoméstico",
          "Años_experiencia_tipo"
        ]
      },
      {
        name: "REGISTRO_REPARACION",
        fields: [
          "*Serial_Electrodoméstico",
          "*Número_del_Técnico",
          "*Fecha_del_servicio",
          "Horas_servicio"
        ]
      }
    ],
    connections: [
      "ELECTRODOMESTICO.Nombre_del_Cliente ➔ CLIENTE.Nombre_del_Cliente",
      "TECNICO_EXPERIENCIA.Número_del_Técnico ➔ TECNICO.Número_del_Técnico",
      "TECNICO_EXPERIENCIA.Tipo_de_Electrodoméstico ➔ TIPO_EQUIPO.Tipo_de_Electrodoméstico",
      "REGISTRO_REPARACION.Serial_Electrodoméstico ➔ ELECTRODOMESTICO.Serial_Electrodoméstico",
      "REGISTRO_REPARACION.Número_del_Técnico ➔ TECNICO.Número_del_Técnico"
    ],
    comparison: `
      <div class="glass-callout">
        <h4>Comparación Académica vs. Industrial</h4>
        <p><strong>Académico:</strong> Se asume la Cédula/Nombre de cliente como llave temporal. La tabla de experiencia asocia directamente técnico y tipo de electrodoméstico en 3FN.</p>
        <p><strong>Industrial:</strong> Un modelo real asigna IDs numéricos estandarizados a clientes y electrodomésticos, y almacena las bitácoras asociando la garantía de forma explícita.</p>
      </div>
    `,
    erDiagram: `
      <svg id="er-diagram-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 500" width="100%" height="100%">
        <!-- == Fila Superior (y=80) == -->
        <g class="svg-entity" tabindex="0">
          <rect x="95" y="80" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="150" y="105" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">CLIENTE</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="755" y="80" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="810" y="105" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">TIPO_EQUIPO</text>
        </g>

        <!-- == Fila Media (y=240) == -->
        <g class="svg-entity" tabindex="0">
          <rect x="75" y="240" width="150" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="150" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">ELECTRODOMESTICO</text>
        </g>
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="735" y="240" width="150" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="739" y="244" width="142" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="810" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">TEC_EXPERIENCIA</text>
        </g>

        <!-- == Fila Inferior (y=400) == -->
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="405" y="400" width="150" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="409" y="404" width="142" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="480" y="425" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">REGISTRO_REPARACION</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="755" y="400" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="810" y="425" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">TECNICO</text>
        </g>

        <!-- == Rombos y Conexiones == -->
        <!-- Posee: CLIENTE ↔ ELECTRODOMESTICO -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="150,145 180,170 150,195 120,170" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="150" y="174" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Posee</text>
        </g>
        <line x1="150" y1="120" x2="150" y2="145" stroke="#64748b" stroke-width="1.5" />
        <line x1="150" y1="195" x2="150" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="160" y="135" fill="#f43f5e" font-size="11">1</text>
        <text x="160" y="230" fill="#f43f5e" font-size="11">N</text>

        <!-- Registra: ELECTRODOMESTICO ↔ REGISTRO_REPARACION -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="315,295 345,320 315,345 285,320" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="315" y="324" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Registra</text>
        </g>
        <line x1="150" y1="280" x2="285" y2="320" stroke="#64748b" stroke-width="1.5" />
        <line x1="345" y1="320" x2="480" y2="400" stroke="#64748b" stroke-width="1.5" />
        <text x="160" y="300" fill="#f43f5e" font-size="11">N</text>
        <text x="460" y="390" fill="#f43f5e" font-size="11">1</text>

        <!-- Hace: TECNICO ↔ REGISTRO_REPARACION -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="645,395 675,420 645,445 615,420" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="645" y="424" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Hace</text>
        </g>
        <line x1="755" y1="420" x2="675" y2="420" stroke="#64748b" stroke-width="1.5" />
        <line x1="615" y1="420" x2="555" y2="420" stroke="#64748b" stroke-width="1.5" />
        <text x="740" y="412" fill="#f43f5e" font-size="11">M</text>
        <text x="565" y="412" fill="#f43f5e" font-size="11">1</text>

        <!-- Abarca: TIPO_EQUIPO ↔ TEC_EXPERIENCIA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="810,145 840,170 810,195 780,170" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="810" y="174" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Abarca</text>
        </g>
        <line x1="810" y1="120" x2="810" y2="145" stroke="#64748b" stroke-width="1.5" />
        <line x1="810" y1="195" x2="810" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="820" y="135" fill="#f43f5e" font-size="11">M</text>
        <text x="820" y="230" fill="#f43f5e" font-size="11">1</text>

        <!-- Tiene: TECNICO ↔ TEC_EXPERIENCIA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="810,305 840,330 810,355 780,330" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="810" y="334" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Tiene</text>
        </g>
        <line x1="810" y1="400" x2="810" y2="355" stroke="#64748b" stroke-width="1.5" />
        <line x1="810" y1="305" x2="810" y2="280" stroke="#64748b" stroke-width="1.5" />
        <text x="820" y="390" fill="#f43f5e" font-size="11">N</text>
        <text x="820" y="295" fill="#f43f5e" font-size="11">1</text>

        <!-- == Elipses de clave primaria == -->
        <g class="svg-attribute">
          <ellipse cx="150" cy="30" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="150" y="34" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">NomClient</text>
          <line x1="150" y1="45" x2="150" y2="80" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="810" cy="30" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="810" y="34" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">TipoEq</text>
          <line x1="810" y1="45" x2="810" y2="80" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
      </svg>
    `
  },
  {
    id: 12,
    title: "12. Reserva de Laboratorio",
    description: "Sistema de reservas de computadoras en laboratorios universitarios con software específico por área académica.",
    content1nf: `
      <h3>Primera Forma Normal (1NF) - Laboratorio</h3>
      <p>Atomización de horarios, bloques de tiempo y claves para la primera forma normal.</p>
    `,
    content2nf: `
      <h3>Segunda Forma Normal (2NF) - Laboratorio</h3>
      <p>Software disponible asociado al área de laboratorio. Claves compuestas jerárquicas.</p>
    `,
    content3nf: `
      <h3>Tercera Forma Normal (3NF) - Laboratorio</h3>
      <p>Reservas y preparadores aislados para evitar transitividad del área de laboratorio.</p>
    `,
    tables1nf: [
      {
        name: "RESERVA_COMPLETO",
        fields: [
          "*Cédula_alumno",
          "Nombre_alumno",
          "*Código_asignatura",
          "*Número_maquina",
          "*Área_Laboratorio",
          "Fecha_reserva",
          "Hora_inicio",
          "Hora_fin",
          "Fecha_Ingreso",
          "Fecha_Egreso",
          "Software_disponible_área",
          "Software_requerido",
          "Fecha_disponibilidad_máquina",
          "Horas_disponibles_máquina",
          "Nombre_preparador"
        ]
      }
    ],
    tables2nf: [
      {
        name: "ALUMNO",
        fields: [
          "*Cédula_alumno",
          "Nombre_alumno",
          "Fecha_Ingreso",
          "Fecha_Egreso"
        ]
      },
      {
        name: "ALUMNO_ASIGNATURA",
        fields: [
          "*Cédula_alumno",
          "*Código_asignatura"
        ]
      },
      {
        name: "AREA_LAB",
        fields: [
          "*Área_Laboratorio",
          "Nombre_preparador"
        ]
      },
      {
        name: "SOFTWARE_AREA",
        fields: [
          "*Área_Laboratorio",
          "*Software_disponible_área"
        ]
      },
      {
        name: "MAQUINA",
        fields: [
          "*Área_Laboratorio",
          "*Número_maquina"
        ]
      },
      {
        name: "MAQUINA_DISPONIBILIDAD",
        fields: [
          "*Área_Laboratorio",
          "*Número_maquina",
          "*Fecha_disponibilidad_máquina",
          "Horas_disponibles_máquina"
        ]
      },
      {
        name: "REGISTRO_RESERVA",
        fields: [
          "*Cédula_alumno",
          "*Área_Laboratorio",
          "*Número_maquina",
          "*Fecha_reserva",
          "Hora_inicio",
          "Hora_fin",
          "Software_requerido"
        ]
      }
    ],
    tables3nf: [
      {
        name: "ALUMNO",
        fields: [
          "*Cédula_alumno",
          "Nombre_alumno",
          "Fecha_Ingreso",
          "Fecha_Egreso"
        ]
      },
      {
        name: "ALUMNO_ASIGNATURA",
        fields: [
          "*Cédula_alumno",
          "*Código_asignatura"
        ]
      },
      {
        name: "AREA_LAB",
        fields: [
          "*Área_Laboratorio",
          "Nombre_preparador"
        ]
      },
      {
        name: "SOFTWARE_AREA",
        fields: [
          "*Área_Laboratorio",
          "*Software_disponible_área"
        ]
      },
      {
        name: "MAQUINA",
        fields: [
          "*Área_Laboratorio",
          "*Número_maquina"
        ]
      },
      {
        name: "MAQUINA_DISPONIBILIDAD",
        fields: [
          "*Área_Laboratorio",
          "*Número_maquina",
          "*Fecha_disponibilidad_máquina",
          "Horas_disponibles_máquina"
        ]
      },
      {
        name: "REGISTRO_RESERVA",
        fields: [
          "*Cédula_alumno",
          "*Área_Laboratorio",
          "*Número_maquina",
          "*Fecha_reserva",
          "Hora_inicio",
          "Hora_fin",
          "Software_requerido"
        ]
      }
    ],
    connections: [
      "ALUMNO_ASIGNATURA.Cédula_alumno ➔ ALUMNO.Cédula_alumno",
      "SOFTWARE_AREA.Área_Laboratorio ➔ AREA_LAB.Área_Laboratorio",
      "MAQUINA.Área_Laboratorio ➔ AREA_LAB.Área_Laboratorio",
      "MAQUINA_DISPONIBILIDAD.Área_Laboratorio ➔ MAQUINA.Área_Laboratorio",
      "MAQUINA_DISPONIBILIDAD.Número_maquina ➔ MAQUINA.Número_maquina",
      "REGISTRO_RESERVA.Cédula_alumno ➔ ALUMNO.Cédula_alumno",
      "REGISTRO_RESERVA.Área_Laboratorio ➔ MAQUINA.Área_Laboratorio",
      "REGISTRO_RESERVA.Número_maquina ➔ MAQUINA.Número_maquina"
    ],
    comparison: `
      <div class="glass-callout">
        <h4>Comparación Académica vs. Industrial</h4>
        <p><strong>Académico:</strong> La máquina posee clave primaria compuesta dependiente del área del laboratorio. La disponibilidad y reservas se gestionan con llaves complejas.</p>
        <p><strong>Industrial:</strong> Un modelo real asigna códigos de barra únicos globales a cada CPU/Máquina en lugar de claves compuestas jerárquicas.</p>
      </div>
    `,
    erDiagram: `
      <svg id="er-diagram-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 500" width="100%" height="100%">
        <!-- == Fila Superior (y=80) == -->
        <g class="svg-entity" tabindex="0">
          <rect x="95" y="80" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="150" y="105" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">ALUMNO</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="595" y="80" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="650" y="105" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">AREA_LAB</text>
        </g>
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="800" y="80" width="120" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="804" y="84" width="112" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="860" y="105" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">SOFTWARE_AREA</text>
        </g>

        <!-- == Fila Media (y=240) == -->
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="330" y="240" width="140" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="334" y="244" width="132" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="400" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">REGISTRO_RESERVA</text>
        </g>
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="595" y="240" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="599" y="244" width="102" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="650" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">MAQUINA</text>
        </g>

        <!-- == Fila Inferior (y=400) == -->
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="90" y="400" width="120" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="94" y="404" width="112" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="150" y="425" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">ALU_ASIGNATURA</text>
        </g>
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="590" y="400" width="120" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="594" y="404" width="112" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="650" y="425" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="10" text-anchor="middle">MAQUINA_DISP</text>
        </g>

        <!-- == Rombos y Conexiones == -->
        <!-- Reserva: ALUMNO ↔ REGISTRO_RESERVA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="275,155 305,180 275,205 245,180" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="275" y="184" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Reserva</text>
        </g>
        <line x1="150" y1="120" x2="275" y2="155" stroke="#64748b" stroke-width="1.5" />
        <line x1="275" y1="205" x2="400" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="200" y="130" fill="#f43f5e" font-size="11">N</text>
        <text x="350" y="235" fill="#f43f5e" font-size="11">1</text>

        <!-- En: MAQUINA ↔ REGISTRO_RESERVA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="525,235 555,260 525,285 495,260" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="525" y="264" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">En</text>
        </g>
        <line x1="595" y1="260" x2="555" y2="260" stroke="#64748b" stroke-width="1.5" />
        <line x1="495" y1="260" x2="470" y2="260" stroke="#64748b" stroke-width="1.5" />
        <text x="575" y="252" fill="#f43f5e" font-size="11">M</text>
        <text x="480" y="252" fill="#f43f5e" font-size="11">1</text>

        <!-- Contiene: AREA_LAB ↔ MAQUINA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="650,155 680,180 650,205 620,180" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="650" y="184" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Contiene</text>
        </g>
        <line x1="650" y1="120" x2="650" y2="155" stroke="#64748b" stroke-width="1.5" />
        <line x1="650" y1="205" x2="650" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="660" y="145" fill="#f43f5e" font-size="11">1</text>
        <text x="660" y="225" fill="#f43f5e" font-size="11">N</text>

        <!-- Instalado: AREA_LAB ↔ SOFTWARE_AREA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="755,75 785,100 755,125 725,100" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="755" y="104" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Instalado</text>
        </g>
        <line x1="705" y1="100" x2="725" y2="100" stroke="#64748b" stroke-width="1.5" />
        <line x1="785" y1="100" x2="800" y2="100" stroke="#64748b" stroke-width="1.5" />
        <text x="715" y="92" fill="#f43f5e" font-size="11">1</text>
        <text x="790" y="92" fill="#f43f5e" font-size="11">N</text>

        <!-- Cursa: ALUMNO ↔ ALU_ASIGNATURA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="150,235 180,260 150,285 120,260" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="150" y="264" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Cursa</text>
        </g>
        <line x1="150" y1="120" x2="150" y2="235" stroke="#64748b" stroke-width="1.5" />
        <line x1="150" y1="285" x2="150" y2="400" stroke="#64748b" stroke-width="1.5" />
        <text x="160" y="145" fill="#f43f5e" font-size="11">1</text>
        <text x="160" y="380" fill="#f43f5e" font-size="11">N</text>

        <!-- Disponible: MAQUINA ↔ MAQUINA_DISP -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="650,315 680,340 650,365 620,340" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="650" y="344" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Disponible</text>
        </g>
        <line x1="650" y1="280" x2="650" y2="315" stroke="#64748b" stroke-width="1.5" />
        <line x1="650" y1="365" x2="650" y2="400" stroke="#64748b" stroke-width="1.5" />
        <text x="660" y="305" fill="#f43f5e" font-size="11">1</text>
        <text x="660" y="385" fill="#f43f5e" font-size="11">N</text>

        <!-- == Elipses de clave primaria == -->
        <g class="svg-attribute">
          <ellipse cx="150" cy="30" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="150" y="34" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CedAlum</text>
          <line x1="150" y1="45" x2="150" y2="80" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="650" cy="30" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="650" y="34" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CodArea</text>
          <line x1="650" y1="45" x2="650" y2="80" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
      </svg>
    `
  },
  {
    id: 13,
    title: "13. Facturación de Restaurante",
    description: "Modelo de consumo de clientes ubicados en mesas atendidas por mesoneros, con comandas facturadas e instrumentos financieros combinados.",
    content1nf: `
      <h3>Primera Forma Normal (1NF) - Restaurante</h3>
      <p>Atomización del ticket de consumo de alimentos para cumplir con la primera forma normal.</p>
    `,
    content2nf: `
      <h3>Segunda Forma Normal (2NF) - Restaurante</h3>
      <p>Separación de las comandas individuales por mesa. Se eliminan las dependencias funcionales parciales.</p>
    `,
    content3nf: `
      <h3>Tercera Forma Normal (3NF) - Restaurante</h3>
      <p>Eliminación de la transitividad entre el mesero y la mesa en el registro de facturas.</p>
    `,
    tables1nf: [
      {
        name: "FACTURACION_RESTAURANTE_COMPLETO",
        fields: [
          "*Nro_Mesa",
          "Cod_Mesonero",
          "Nombre_Mesonero",
          "*Código_Producto",
          "Descripción_Producto",
          "Precio_Producto",
          "Cantidad",
          "Subtotal_Factura",
          "IVA_12%",
          "Servicio_10%",
          "Total_General",
          "Instrumento_Financiero",
          "Monto_Cancelado"
        ]
      }
    ],
    tables2nf: [
      {
        name: "MESONERO",
        fields: [
          "*Cod_Mesonero",
          "Nombre_Mesonero"
        ]
      },
      {
        name: "PRODUCTO",
        fields: [
          "*Código_Producto",
          "Descripción_Producto",
          "Precio_Producto"
        ]
      },
      {
        name: "CUENTA_MESA",
        fields: [
          "*Nro_Mesa",
          "Cod_Mesonero",
          "Subtotal_Factura",
          "IVA_12%",
          "Servicio_10%",
          "Total_General"
        ]
      },
      {
        name: "DETALLE_CONSUMO",
        fields: [
          "*Nro_Mesa",
          "*Código_Producto",
          "Cantidad"
        ]
      },
      {
        name: "PAGO_FACTURA",
        fields: [
          "*Nro_Mesa",
          "*Instrumento_Financiero",
          "Monto_Cancelado"
        ]
      }
    ],
    tables3nf: [
      {
        name: "MESONERO",
        fields: [
          "*Cod_Mesonero",
          "Nombre_Mesonero"
        ]
      },
      {
        name: "PRODUCTO",
        fields: [
          "*Código_Producto",
          "Descripción_Producto",
          "Precio_Producto"
        ]
      },
      {
        name: "CUENTA_MESA",
        fields: [
          "*Nro_Mesa",
          "Cod_Mesonero",
          "Subtotal_Factura",
          "IVA_12%",
          "Servicio_10%",
          "Total_General"
        ]
      },
      {
        name: "DETALLE_CONSUMO",
        fields: [
          "*Nro_Mesa",
          "*Código_Producto",
          "Cantidad"
        ]
      },
      {
        name: "PAGO_FACTURA",
        fields: [
          "*Nro_Mesa",
          "*Instrumento_Financiero",
          "Monto_Cancelado"
        ]
      }
    ],
    connections: [
      "CUENTA_MESA.Cod_Mesonero ➔ MESONERO.Cod_Mesonero",
      "DETALLE_CONSUMO.Nro_Mesa ➔ CUENTA_MESA.Nro_Mesa",
      "DETALLE_CONSUMO.Código_Producto ➔ PRODUCTO.Código_Producto",
      "PAGO_FACTURA.Nro_Mesa ➔ CUENTA_MESA.Nro_Mesa"
    ],
    comparison: `
      <div class="glass-callout">
        <h4>Comparación Académica vs. Industrial</h4>
        <p><strong>Académico:</strong> La cuenta se asocia a la Mesa como clave primaria en 3FN. Los pagos parciales con varios instrumentos se desglosan por separado.</p>
        <p><strong>Industrial:</strong> Se asocia la factura a una Orden única (no a la mesa física) y se implementa una pasarela de pagos con control transaccional integrado.</p>
      </div>
    `,
    erDiagram: `
      <svg id="er-diagram-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" width="100%" height="100%">
        <!-- == Fila Superior (y=60) == -->
        <g class="svg-entity" tabindex="0">
          <rect x="95" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="150" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">MESONERO</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="395" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="450" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">CUENTA_MESA</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="695" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="750" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">PRODUCTO</text>
        </g>

        <!-- == Fila Inferior - Entidades Débiles e Intermedias (y=240) == -->
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="185" y="240" width="130" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="189" y="244" width="122" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="250" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">PAGO_FACTURA</text>
        </g>
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="535" y="240" width="130" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="539" y="244" width="122" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="600" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">DETALLE_CONSUMO</text>
        </g>

        <!-- == Rombos y Conexiones == -->
        <!-- Atiende: MESONERO ↔ CUENTA_MESA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="300,55 330,80 300,105 270,80" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="300" y="84" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Atiende</text>
        </g>
        <line x1="205" y1="80" x2="270" y2="80" stroke="#64748b" stroke-width="1.5" />
        <line x1="330" y1="80" x2="395" y2="80" stroke="#64748b" stroke-width="1.5" />
        <text x="215" y="72" fill="#f43f5e" font-size="11">1</text>
        <text x="380" y="72" fill="#f43f5e" font-size="11">N</text>

        <!-- Abona: CUENTA_MESA ↔ PAGO_FACTURA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="350,145 380,170 350,195 320,170" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="350" y="174" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Abona</text>
        </g>
        <line x1="450" y1="100" x2="380" y2="170" stroke="#64748b" stroke-width="1.5" />
        <line x1="320" y1="170" x2="250" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="460" y="125" fill="#f43f5e" font-size="11">1</text>
        <text x="235" y="235" fill="#f43f5e" font-size="11">N</text>

        <!-- Contiene: CUENTA_MESA ↔ DETALLE_CONSUMO -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="525,145 555,170 525,195 495,170" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="525" y="174" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Contiene</text>
        </g>
        <line x1="450" y1="100" x2="495" y2="170" stroke="#64748b" stroke-width="1.5" />
        <line x1="555" y1="170" x2="600" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="440" y="125" fill="#f43f5e" font-size="11">N</text>
        <text x="615" y="235" fill="#f43f5e" font-size="11">1</text>

        <!-- Abarca: PRODUCTO ↔ DETALLE_CONSUMO -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="675,145 705,170 675,195 645,170" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="675" y="174" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Abarca</text>
        </g>
        <line x1="750" y1="100" x2="705" y2="170" stroke="#64748b" stroke-width="1.5" />
        <line x1="645" y1="170" x2="600" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="760" y="125" fill="#f43f5e" font-size="11">M</text>
        <text x="585" y="235" fill="#f43f5e" font-size="11">1</text>

        <!-- == Elipses de clave primaria == -->
        <g class="svg-attribute">
          <ellipse cx="150" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="150" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CodMesonero</text>
          <line x1="150" y1="35" x2="150" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="450" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="450" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">NroMesa</text>
          <line x1="450" y1="35" x2="450" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="750" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="750" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CodProd</text>
          <line x1="750" y1="35" x2="750" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
      </svg>
    `
  },
  {
    id: 14,
    title: "14. Cuentas por Pagar",
    description: "Gestión de cuentas por pagar a proveedores comerciales con historiales de facturas recibidas y recibos de abono por partes.",
    content1nf: `
      <h3>Primera Forma Normal (1NF) - Cuentas por Pagar</h3>
      <p>Atomización de facturas de proveedores y abonos realizados para cumplir con la primera forma normal.</p>
    `,
    content2nf: `
      <h3>Segunda Forma Normal (2NF) - Cuentas por Pagar</h3>
      <p>Relación de los detalles de saldo insoluto de cada factura despachada. Dependencia funcional parcial resuelta.</p>
    `,
    content3nf: `
      <h3>Tercera Forma Normal (3NF) - Cuentas por Pagar</h3>
      <p>Eliminación de la transitividad entre el banco emisor de cheques y la factura del proveedor.</p>
    `,
    tables1nf: [
      {
        name: "CUENTAS_PAGAR_COMPLETO",
        fields: [
          "Código_Proveedor",
          "Nombre_Proveedor",
          "RIF_Proveedor",
          "Tlf_Proveedor",
          "Dirección_Proveedor",
          "*Código_Articulo",
          "Descripción_Articulo",
          "Precio_Compra_Standard",
          "*Número_Factura",
          "Fecha_Emisión",
          "Monto_Total_Factura",
          "Cantidad_Despachada",
          "Precio_Compra_Factura",
          "*Número_Recibo",
          "Fecha_Pago",
          "Monto_Cancelado",
          "Forma_Pago"
        ]
      }
    ],
    tables2nf: [
      {
        name: "PROVEEDOR",
        fields: [
          "*Código_Proveedor",
          "Nombre_Proveedor",
          "RIF_Proveedor",
          "Tlf_Proveedor",
          "Dirección_Proveedor"
        ]
      },
      {
        name: "ARTICULO",
        fields: [
          "*Código_Articulo",
          "Descripción_Articulo",
          "Precio_Compra_Standard"
        ]
      },
      {
        name: "FACTURA",
        fields: [
          "*Número_Factura",
          "Código_Proveedor",
          "Fecha_Emisión",
          "Monto_Total_Factura"
        ]
      },
      {
        name: "DETALLE_FACTURA",
        fields: [
          "*Número_Factura",
          "*Código_Articulo",
          "Cantidad_Despachada",
          "Precio_Compra_Factura"
        ]
      },
      {
        name: "RECIBO",
        fields: [
          "*Número_Recibo",
          "Número_Factura",
          "Fecha_Pago",
          "Monto_Cancelado",
          "Forma_Pago"
        ]
      }
    ],
    tables3nf: [
      {
        name: "PROVEEDOR",
        fields: [
          "*Código_Proveedor",
          "Nombre_Proveedor",
          "RIF_Proveedor",
          "Tlf_Proveedor",
          "Dirección_Proveedor"
        ]
      },
      {
        name: "ARTICULO",
        fields: [
          "*Código_Articulo",
          "Descripción_Articulo",
          "Precio_Compra_Standard"
        ]
      },
      {
        name: "FACTURA",
        fields: [
          "*Número_Factura",
          "Código_Proveedor",
          "Fecha_Emisión",
          "Monto_Total_Factura"
        ]
      },
      {
        name: "DETALLE_FACTURA",
        fields: [
          "*Número_Factura",
          "*Código_Articulo",
          "Cantidad_Despachada",
          "Precio_Compra_Factura"
        ]
      },
      {
        name: "RECIBO",
        fields: [
          "*Número_Recibo",
          "Número_Factura",
          "Fecha_Pago",
          "Monto_Cancelado",
          "Forma_Pago"
        ]
      }
    ],
    connections: [
      "FACTURA.Código_Proveedor ➔ PROVEEDOR.Código_Proveedor",
      "DETALLE_FACTURA.Número_Factura ➔ FACTURA.Número_Factura",
      "DETALLE_FACTURA.Código_Articulo ➔ ARTICULO.Código_Articulo",
      "RECIBO.Número_Factura ➔ FACTURA.Número_Factura"
    ],
    comparison: `
      <div class="glass-callout">
        <h4>Comparación Académica vs. Industrial</h4>
        <p><strong>Académico:</strong> Una factura tiene múltiples recibos de pago si se cancela en partes. Se modela en tablas separadas en 3FN.</p>
        <p><strong>Industrial:</strong> Un modelo ERP industrial real mantiene estados de pago (Pendiente, Parcial, Pagada) e integra la información directamente con cuentas contables.</p>
      </div>
    `,
    erDiagram: `
      <svg id="er-diagram-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" width="100%" height="100%">
        <!-- == Fila Superior (y=60) == -->
        <g class="svg-entity" tabindex="0">
          <rect x="95" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="150" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">PROVEEDOR</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="395" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="450" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">FACTURA</text>
        </g>
        <g class="svg-entity" tabindex="0">
          <rect x="695" y="60" width="110" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <text x="750" y="85" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">ARTICULO</text>
        </g>

        <!-- == Fila Inferior - Entidades Débiles e Intermedias (y=240) == -->
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="185" y="240" width="130" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="189" y="244" width="122" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="250" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">RECIBO</text>
        </g>
        <g class="svg-entity svg-weak-entity" tabindex="0">
          <rect x="535" y="240" width="130" height="40" rx="5" fill="#1e293b" stroke="#3b82f6" stroke-width="3" />
          <rect x="539" y="244" width="122" height="32" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="600" y="265" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="11" text-anchor="middle">DETALLE_FACTURA</text>
        </g>

        <!-- == Rombos y Conexiones == -->
        <!-- Emite: PROVEEDOR ↔ FACTURA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="300,55 330,80 300,105 270,80" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="300" y="84" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Emite</text>
        </g>
        <line x1="205" y1="80" x2="270" y2="80" stroke="#64748b" stroke-width="1.5" />
        <line x1="330" y1="80" x2="395" y2="80" stroke="#64748b" stroke-width="1.5" />
        <text x="215" y="72" fill="#f43f5e" font-size="11">1</text>
        <text x="380" y="72" fill="#f43f5e" font-size="11">N</text>

        <!-- Paga: FACTURA ↔ RECIBO -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="350,145 380,170 350,195 320,170" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="350" y="174" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Paga</text>
        </g>
        <line x1="450" y1="100" x2="380" y2="170" stroke="#64748b" stroke-width="1.5" />
        <line x1="320" y1="170" x2="250" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="460" y="125" fill="#f43f5e" font-size="11">1</text>
        <text x="235" y="235" fill="#f43f5e" font-size="11">N</text>

        <!-- Contiene: FACTURA ↔ DETALLE_FACTURA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="525,145 555,170 525,195 495,170" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="525" y="174" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Contiene</text>
        </g>
        <line x1="450" y1="100" x2="495" y2="170" stroke="#64748b" stroke-width="1.5" />
        <line x1="555" y1="170" x2="600" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="440" y="125" fill="#f43f5e" font-size="11">N</text>
        <text x="615" y="235" fill="#f43f5e" font-size="11">1</text>

        <!-- Abarca: ARTICULO ↔ DETALLE_FACTURA -->
        <g class="svg-relationship" tabindex="0">
          <polygon points="675,145 705,170 675,195 645,170" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="675" y="174" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">Abarca</text>
        </g>
        <line x1="750" y1="100" x2="705" y2="170" stroke="#64748b" stroke-width="1.5" />
        <line x1="645" y1="170" x2="600" y2="240" stroke="#64748b" stroke-width="1.5" />
        <text x="760" y="125" fill="#f43f5e" font-size="11">M</text>
        <text x="585" y="235" fill="#f43f5e" font-size="11">1</text>

        <!-- == Elipses de clave primaria == -->
        <g class="svg-attribute">
          <ellipse cx="150" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="150" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CodProve</text>
          <line x1="150" y1="35" x2="150" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="450" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="450" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">NroFactura</text>
          <line x1="450" y1="35" x2="450" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
        <g class="svg-attribute">
          <ellipse cx="750" cy="20" rx="35" ry="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <text x="750" y="24" fill="#f8fafc" font-family="Outfit, sans-serif" font-size="9" text-anchor="middle">CodArt</text>
          <line x1="750" y1="35" x2="750" y2="60" stroke="#64748b" stroke-dasharray="3,3" />
        </g>
      </svg>
    `
  }
];
