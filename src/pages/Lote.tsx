import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface Lote {
    codigoLote: string;
    litros: string;
    heladero: string;
    saborGelato: string;
    ingredientes: string;
    fecha: string;
}

const Lote = () => {
    const [codigoLote, setCodigoLote] = useState('');
    const [litros, setLitros] = useState('');
    const [heladero, setHeladero] = useState('');
    const [saborGelato, setSaborGelato] = useState('');
    const [ingredientes, setIngredientes] = useState('');
    const [fecha, setFecha] = useState('');
    const [heladeros, setHeladeros] = useState<any[]>([]);
    const [sabores, setSabores] = useState<any[]>([]);
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [editando, setEditando] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [nuevoHeladero, setNuevoHeladero] = useState<{ codigo: string, nombre: string, fechaNacimiento: string }>({
        codigo: '',
        nombre: '',
        fechaNacimiento: '',
    });

    // Cargar datos desde LocalStorage
    useEffect(() => {
        const heladerosData = JSON.parse(localStorage.getItem('heladeros') || '[]');
        setHeladeros(heladerosData);

        const saboresData = JSON.parse(localStorage.getItem('sabores') || '[]');
        setSabores(saboresData);

        const lotesData = JSON.parse(localStorage.getItem('lotes') || '[]');
        setLotes(lotesData);
    }, []);

    // Guardar el lote
    const guardarLote = () => {
        if (!codigoLote || !litros || !heladero || !saborGelato || !ingredientes || !fecha) return;
        const nuevoLote: Lote = { codigoLote, litros, heladero, saborGelato, ingredientes, fecha };
        const lotesActualizados = [...lotes, nuevoLote];
        setLotes(lotesActualizados);
        localStorage.setItem('lotes', JSON.stringify(lotesActualizados));
        resetForm();
    };

    // Modificar lote
    const modificarLote = () => {
        const lotesActualizados = lotes.map((lote) => {
            if (lote.codigoLote === codigoLote) {
                return { codigoLote, litros, heladero, saborGelato, ingredientes, fecha };
            }
            return lote;
        });
        setLotes(lotesActualizados);
        localStorage.setItem('lotes', JSON.stringify(lotesActualizados));
        resetForm();
    };

    // Eliminar lote
    const eliminarLote = (codigo: string) => {
        const lotesActualizados = lotes.filter((lote) => lote.codigoLote !== codigo);
        setLotes(lotesActualizados);
        localStorage.setItem('lotes', JSON.stringify(lotesActualizados));
        resetForm();
    };

    // Cargar lote en el formulario para modificar
    const cargarLote = (lote: Lote) => {
        setCodigoLote(lote.codigoLote);
        setLitros(lote.litros);
        setHeladero(lote.heladero);
        setSaborGelato(lote.saborGelato);
        setIngredientes(lote.ingredientes);
        setFecha(lote.fecha);
        setEditando(true);
    };

    // Limpiar formulario
    const resetForm = () => {
        setCodigoLote('');
        setLitros('');
        setHeladero('');
        setSaborGelato('');
        setIngredientes('');
        setFecha('');
        setEditando(false);
    };

    // Agregar heladero
    const agregarHeladero = () => {
        if (!nuevoHeladero.codigo || !nuevoHeladero.nombre || !nuevoHeladero.fechaNacimiento) return;
        const heladeroToAdd = { codigo: nuevoHeladero.codigo, nombre: nuevoHeladero.nombre, fechaNacimiento: nuevoHeladero.fechaNacimiento };
        const heladerosActualizados = [...heladeros, heladeroToAdd];
        setHeladeros(heladerosActualizados);
        localStorage.setItem('heladeros', JSON.stringify(heladerosActualizados));
        setNuevoHeladero({ codigo: '', nombre: '', fechaNacimiento: '' });
        setOpenDialog(false);
    };

    // Función para abrir el diálogo de agregar heladero
    const abrirDialogoHeladero = () => {
        setNuevoHeladero({ codigo: '', nombre: '', fechaNacimiento: '' });
        setOpenDialog(true);
    };

    // Función para cerrar el diálogo de agregar heladero
    const cerrarDialogoHeladero = () => {
        setOpenDialog(false);
    };

    return (
        <Grid container spacing={3} sx={{ padding: 3 }}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Gestionar Lote
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#00796b', fontWeight: 'bold' }}>
                        Añadir/Modificar Lote
                    </Typography>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Código del Lote"
                                    variant="outlined"
                                    fullWidth
                                    value={codigoLote}
                                    onChange={(e) => setCodigoLote(e.target.value)}
                                    disabled={editando}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Litros a Producir"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    value={litros}
                                    onChange={(e) => setLitros(e.target.value)}
                                />
                            </Grid>

                            {/* Sabor Gelato */}
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Sabor Gelato</InputLabel>
                                    <Select
                                        value={saborGelato}
                                        onChange={(e) => setSaborGelato(e.target.value)}
                                        disabled={sabores.length === 0}
                                    >
                                        {sabores.length > 0 ? (
                                            sabores.map((sabor) => (
                                                <MenuItem key={sabor.codigoSabor} value={sabor.nombreSabor}>
                                                    {sabor.nombreSabor}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>No hay sabores registrados</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Heladero */}
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Heladero</InputLabel>
                                    <Select
                                        value={heladero}
                                        onChange={(e) => setHeladero(e.target.value)}
                                        renderValue={(selected) => {
                                            if (!selected) {
                                                return <em>Selecciona o agrega un heladero</em>;
                                            }
                                            const h = heladeros.find(h => h.codigo === selected);
                                            return h ? h.nombre : selected;
                                        }}
                                    >
                                        {heladeros.length > 0 ? (
                                            heladeros.map((heladero) => (
                                                <MenuItem key={heladero.codigo} value={heladero.codigo}>
                                                    {heladero.nombre}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>No hay heladeros registrados</MenuItem>
                                        )}
                                        <MenuItem onClick={abrirDialogoHeladero} value="">
                                            ➕ Agregar Heladero
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Ingredientes"
                                    variant="outlined"
                                    fullWidth
                                    value={ingredientes}
                                    onChange={(e) => setIngredientes(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Fecha"
                                    variant="outlined"
                                    type="date"
                                    fullWidth
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={editando ? modificarLote : guardarLote}
                                    fullWidth
                                    sx={{
                                        backgroundColor: '#00796b',
                                        '&:hover': { backgroundColor: '#004d40' },
                                        borderRadius: 2,
                                        padding: '12px',
                                    }}
                                >
                                    {editando ? 'Modificar Lote' : 'Insertar Lote'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>

            {/* Mostrar lotes guardados */}
            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#00796b', fontWeight: 'bold' }}>
                        Lotes Guardados
                    </Typography>
                    <Grid container spacing={2}>
                        {lotes.length === 0 ? (
                            <Typography variant="body1" sx={{ width: '100%' }}>
                                No hay lotes guardados.
                            </Typography>
                        ) : (
                            lotes.map((item, index) => (
                                <Grid item xs={12} key={index}>
                                    <Paper sx={{ padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div>
                                            <Typography variant="body1">{`Código de Lote: ${item.codigoLote}`}</Typography>
                                            <Typography variant="body1">{`Litros a Producir: ${item.litros}`}</Typography>
                                            <Typography variant="body1">{`Sabor Gelato: ${item.saborGelato}`}</Typography>
                                            <Typography variant="body1"> {`Heladero: ${heladeros.find(h => h.codigo === item.heladero)?.nombre || item.heladero}`}</Typography>
                                            <Typography variant="body1">{`Ingredientes: ${item.ingredientes}`}</Typography>
                                            <Typography variant="body1">{`Fecha: ${item.fecha}`}</Typography>
                                        </div>
                                        <div>
                                            <Button
                                                color="primary"
                                                onClick={() => cargarLote(item)}
                                                sx={{ marginRight: 1 }}
                                            >
                                                Modificar
                                            </Button>
                                            <Button
                                                color="error"
                                                onClick={() => eliminarLote(item.codigoLote)}
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </Paper>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Paper>
            </Grid>

            {/* Agregar Heladero Dialog */}
            <Dialog open={openDialog} onClose={cerrarDialogoHeladero}>
                <DialogTitle>Agregar Heladero</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Código del Heladero"
                        fullWidth
                        value={nuevoHeladero.codigo}
                        onChange={(e) => setNuevoHeladero({ ...nuevoHeladero, codigo: e.target.value })}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Nombre del Heladero"
                        fullWidth
                        value={nuevoHeladero.nombre}
                        onChange={(e) => setNuevoHeladero({ ...nuevoHeladero, nombre: e.target.value })}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Fecha de Nacimiento"
                        fullWidth
                        type="date"
                        value={nuevoHeladero.fechaNacimiento}
                        onChange={(e) => setNuevoHeladero({ ...nuevoHeladero, fechaNacimiento: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginBottom: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={cerrarDialogoHeladero} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={agregarHeladero} color="primary" variant="contained">
                        Agregar Heladero
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default Lote;