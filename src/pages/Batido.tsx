import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, Alert } from '@mui/material';

// Tipos para TypeScript
interface Heladero {
  codigo: string;
  nombre: string;
}

interface Sabor {
  codigoSabor: string;
  nombreSabor: string;
}

interface Lote {
  codigoLote: string;
  heladero: string; // código del heladero
  saborGelato: string; // código del sabor
}

interface Batido {
  codigoBatido: string;
  codigoLote: string;
  fecha: string;
  litros: string;
}

const Batido = () => {
  const [codigoBatido, setCodigoBatido] = useState('');
  const [codigoLote, setCodigoLote] = useState('');
  const [fecha, setFecha] = useState('');
  const [litros, setLitros] = useState('');
  const [batidos, setBatidos] = useState<Batido[]>([]);
  const [pesados, setPesados] = useState<any[]>([]);
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [heladeros, setHeladeros] = useState<Heladero[]>([]);
  const [sabores, setSabores] = useState<Sabor[]>([]);
  const [loteSeleccionado, setLoteSeleccionado] = useState<Lote | null>(null);
  const [editando, setEditando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setBatidos(JSON.parse(localStorage.getItem('batidos') || '[]'));
    setPesados(JSON.parse(localStorage.getItem('pesados') || '[]'));
    setLotes(JSON.parse(localStorage.getItem('lotes') || '[]'));
    setHeladeros(JSON.parse(localStorage.getItem('heladeros') || '[]'));
    setSabores(JSON.parse(localStorage.getItem('sabores') || '[]'));
  }, []);

  // Buscar lote y verificar que exista un pesado para ese lote
  const buscarLote = () => {
    setError('');
    const lote = lotes.find((l) => l.codigoLote === codigoLote);
    if (!lote) {
      setLoteSeleccionado(null);
      setError('No existe el lote. Regístrelo primero.');
      return;
    }
    const existePesado = pesados.some((p) => p.codigoLote === codigoLote);
    if (!existePesado) {
      setLoteSeleccionado(null);
      setError('Debe existir un Pesado para este lote antes de registrar el Batido.');
      return;
    }
    setLoteSeleccionado(lote);
  };

  // Guardar o modificar batido
  const guardarBatido = () => {
    setError('');
    if (!codigoBatido || !codigoLote || !fecha || !litros) {
      setError('Completa todos los campos.');
      return;
    }

    if (editando) {
      const batidosActualizados = batidos.map((b) =>
        b.codigoBatido === codigoBatido
          ? { codigoBatido, codigoLote, fecha, litros }
          : b
      );
      setBatidos(batidosActualizados);
      localStorage.setItem('batidos', JSON.stringify(batidosActualizados));
      resetForm();
      return;
    }

    if (batidos.some((b) => b.codigoBatido === codigoBatido)) {
      setError('No se pueden registrar dos batidos con el mismo código.');
      return;
    }

    const nuevoBatido = { codigoBatido, codigoLote, fecha, litros };
    const batidosActualizados = [...batidos, nuevoBatido];
    setBatidos(batidosActualizados);
    localStorage.setItem('batidos', JSON.stringify(batidosActualizados));
    resetForm();
  };

  // Cargar batido para modificar
  const cargarBatido = (batido: Batido) => {
    setCodigoBatido(batido.codigoBatido);
    setCodigoLote(batido.codigoLote);
    setFecha(batido.fecha);
    setLitros(batido.litros);
    setLoteSeleccionado(lotes.find((l) => l.codigoLote === batido.codigoLote) || null);
    setEditando(true);
    setError('');
  };

  // Eliminar batido
  const eliminarBatido = (codigo: string) => {
    const batidosActualizados = batidos.filter((b) => b.codigoBatido !== codigo);
    setBatidos(batidosActualizados);
    localStorage.setItem('batidos', JSON.stringify(batidosActualizados));
    resetForm();
  };

  // Limpiar formulario
  const resetForm = () => {
    setCodigoBatido('');
    setCodigoLote('');
    setFecha('');
    setLitros('');
    setLoteSeleccionado(null);
    setEditando(false);
    setError('');
  };

  // Obtener nombre del heladero y sabor para mostrar
  const heladeroNombre = loteSeleccionado
    ? heladeros.find((h) => h.codigo === loteSeleccionado.heladero)?.nombre ||
    loteSeleccionado.heladero
    : '';
  const saborNombre = loteSeleccionado
    ? sabores.find((s) => s.codigoSabor === loteSeleccionado.saborGelato)?.nombreSabor ||
    loteSeleccionado.saborGelato
    : '';

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: 'center', fontWeight: 'bold' }}
        >
          Gestionar Batido
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: '#00796b', fontWeight: 'bold' }}
          >
            {editando ? 'Modificar Batido' : 'Registrar Batido'}
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              guardarBatido();
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Código del Batido"
                  variant="outlined"
                  fullWidth
                  value={codigoBatido}
                  onChange={(e) => setCodigoBatido(e.target.value)}
                  disabled={editando}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Código del Lote"
                  variant="outlined"
                  fullWidth
                  value={codigoLote}
                  onChange={(e) => setCodigoLote(e.target.value)}
                  onBlur={buscarLote}
                  disabled={editando}
                />
              </Grid>
              {loteSeleccionado && (
                <>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body1">
                      <b>Heladero:</b> {heladeroNombre}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body1">
                      <b>Sabor:</b> {saborNombre}
                    </Typography>
                  </Grid>
                </>
              )}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Fecha de Batido"
                  variant="outlined"
                  type="date"
                  fullWidth
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Litros Producidos"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={litros}
                  onChange={(e) => setLitros(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{
                    backgroundColor: '#00796b',
                    '&:hover': { backgroundColor: '#004d40' },
                    borderRadius: 2,
                    padding: '12px',
                  }}
                >
                  {editando ? 'Modificar Batido' : 'Registrar Batido'}
                </Button>
                {editando && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={resetForm}
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    Cancelar
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>

      {/* Mostrar batidos guardados */}
      <Grid item xs={12}>
        <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: '#00796b', fontWeight: 'bold', mb: 4 }}
          >
            Batidos Registrados
          </Typography>
          <Grid container spacing={2}>
            {batidos.length === 0 ? (
              <Typography variant="body1" sx={{ width: '100%', mb: 6 }}>
                No hay batidos registrados.
              </Typography>
            ) : (
              batidos.map((item, index) => {
                const lote = lotes.find((l) => l.codigoLote === item.codigoLote);
                const heladeroNombre = lote
                  ? heladeros.find((h) => h.codigo === lote.heladero)?.nombre ||
                  lote.heladero
                  : '';
                const saborNombre = lote
                  ? sabores.find((s) => s.codigoSabor === lote.saborGelato)?.nombreSabor ||
                  lote.saborGelato
                  : '';
                return (
                  <Grid item xs={12} key={index}>
                    <Paper
                      sx={{
                        padding: 2,
                        marginBottom: 2,
                        borderRadius: 2,
                        boxShadow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <Typography variant="body1">{`Código de Batido: ${item.codigoBatido}`}</Typography>
                        <Typography variant="body1">{`Código de Lote: ${item.codigoLote}`}</Typography>
                        <Typography variant="body1">{`Heladero: ${heladeroNombre}`}</Typography>
                        <Typography variant="body1">{`Sabor: ${saborNombre}`}</Typography>
                        <Typography variant="body1">{`Fecha: ${item.fecha}`}</Typography>
                        <Typography variant="body2">{`Litros Producidos: ${item.litros} litros`}</Typography>
                      </div>
                      <div>
                        <Button
                          color="primary"
                          onClick={() => cargarBatido(item)}
                          sx={{ marginRight: 1 }}
                        >
                          Modificar
                        </Button>
                        <Button
                          color="error"
                          onClick={() => eliminarBatido(item.codigoBatido)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </Paper>
                  </Grid>
                );
              })
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Batido;