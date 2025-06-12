import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, Alert } from '@mui/material';

interface Heladero {
    codigo: string;
    nombre: string;
    fechaNacimiento: string;
}

const Heladeros = () => {
    const [codigoHeladero, setCodigoHeladero] = useState('');
    const [nombreHeladero, setNombreHeladero] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [heladeros, setHeladeros] = useState<Heladero[]>([]);
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState(''); // <-- Nuevo estado para el error

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('heladeros') || '[]');
        setHeladeros(data);
    }, []);

    const guardarHeladero = () => {
        setError('');
        if (!codigoHeladero || !nombreHeladero || !fechaNacimiento) return;

        if (editando) {
            const heladerosActualizados = heladeros.map(h =>
                h.codigo === codigoHeladero
                    ? { codigo: codigoHeladero, nombre: nombreHeladero, fechaNacimiento }
                    : h
            );
            setHeladeros(heladerosActualizados);
            localStorage.setItem('heladeros', JSON.stringify(heladerosActualizados));
            resetForm();
            return;
        }

        if (heladeros.some(h => h.codigo === codigoHeladero)) {
            setError('No se pueden registrar dos heladeros con el mismo código.');
            return;
        }

        const nuevoHeladero = { codigo: codigoHeladero, nombre: nombreHeladero, fechaNacimiento };
        const heladerosActualizados = [...heladeros, nuevoHeladero];
        setHeladeros(heladerosActualizados);
        localStorage.setItem('heladeros', JSON.stringify(heladerosActualizados));
        resetForm();
    };

    const cargarHeladero = (heladero: Heladero) => {
        setCodigoHeladero(heladero.codigo);
        setNombreHeladero(heladero.nombre);
        setFechaNacimiento(heladero.fechaNacimiento);
        setEditando(true);
        setError('');
    };

    const eliminarHeladero = (codigo: string) => {
        const heladerosActualizados = heladeros.filter(h => h.codigo !== codigo);
        setHeladeros(heladerosActualizados);
        localStorage.setItem('heladeros', JSON.stringify(heladerosActualizados));
        resetForm();
    };

    const resetForm = () => {
        setCodigoHeladero('');
        setNombreHeladero('');
        setFechaNacimiento('');
        setEditando(false);
        setError('');
    };

    return (
        <Grid container spacing={3} sx={{ padding: 3 }}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Gestionar Heladeros
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#00796b', fontWeight: 'bold' }}>
                        {editando ? 'Modificar Heladero' : 'Añadir Nuevo Heladero'}
                    </Typography>
                    {/* Mostrar mensaje de error bonito */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <form onSubmit={e => { e.preventDefault(); guardarHeladero(); }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Código del Heladero"
                                    variant="outlined"
                                    fullWidth
                                    value={codigoHeladero}
                                    onChange={(e) => setCodigoHeladero(e.target.value)}
                                    disabled={editando}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Nombre del Heladero"
                                    variant="outlined"
                                    fullWidth
                                    value={nombreHeladero}
                                    onChange={(e) => setNombreHeladero(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Fecha de Nacimiento"
                                    variant="outlined"
                                    type="date"
                                    fullWidth
                                    value={fechaNacimiento}
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
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
                                    {editando ? 'Modificar Heladero' : 'Registrar Heladero'}
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

            {/* Mostrar heladeros guardados */}
            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#00796b', fontWeight: 'bold' }}>
                        Heladeros Registrados
                    </Typography>
                    <Grid container spacing={2}>
                        {heladeros.length === 0 ? (
                            <Typography variant="body1" sx={{ width: '100%' }}>
                                No hay heladeros registrados.
                            </Typography>
                        ) : (
                            heladeros.map((item, index) => (
                                <Grid item xs={12} key={index}>
                                    <Paper sx={{ padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div>
                                            <Typography variant="body1">{`Código: ${item.codigo}`}</Typography>
                                            <Typography variant="body1">{`Nombre: ${item.nombre}`}</Typography>
                                            <Typography variant="body1">{`Fecha de Nacimiento: ${item.fechaNacimiento}`}</Typography>
                                        </div>
                                        <div>
                                            <Button
                                                color="primary"
                                                onClick={() => cargarHeladero(item)}
                                                sx={{ marginRight: 1 }}
                                            >
                                                Modificar
                                            </Button>
                                            <Button
                                                color="error"
                                                onClick={() => eliminarHeladero(item.codigo)}
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
        </Grid>
    );
};

export default Heladeros;