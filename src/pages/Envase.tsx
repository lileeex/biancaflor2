import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, Alert, MenuItem } from '@mui/material';

interface Envase {
    codigoEnvase: string;
    nombreEnvase: string;
    litrosPorEnvase: string;
    saborGelato: string;
    heladero: string;
    cantidad: string;
}

interface Sabor {
    codigoSabor: string;
    nombreSabor: string;
}

interface Heladero {
    codigo: string;
    nombre: string;
}

const getSafeString = (value: any) => (typeof value === 'string' ? value : '');

const EnvasePage = () => {
    const [codigoEnvase, setCodigoEnvase] = useState('');
    const [nombreEnvase, setNombreEnvase] = useState('');
    const [litrosPorEnvase, setLitrosPorEnvase] = useState('');
    const [saborGelato, setSaborGelato] = useState('');
    const [heladero, setHeladero] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [envases, setEnvases] = useState<Envase[]>([]);
    const [sabores, setSabores] = useState<Sabor[]>([]);
    const [heladeros, setHeladeros] = useState<Heladero[]>([]);
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setEnvases(JSON.parse(localStorage.getItem('envases') || '[]'));
        setSabores(JSON.parse(localStorage.getItem('sabores') || '[]'));
        setHeladeros(JSON.parse(localStorage.getItem('heladeros') || '[]'));
    }, []);

    // Cuando cambia el código, si existe, carga los datos
    useEffect(() => {
        const envaseExistente = envases.find((e) => e.codigoEnvase === codigoEnvase);
        if (envaseExistente) {
            setNombreEnvase(getSafeString(envaseExistente.nombreEnvase));
            setLitrosPorEnvase(getSafeString(envaseExistente.litrosPorEnvase));
            setSaborGelato(getSafeString(envaseExistente.saborGelato));
            setHeladero(getSafeString(envaseExistente.heladero));
            setCantidad(getSafeString(envaseExistente.cantidad));
            setEditando(true);
            setError('');
        } else if (codigoEnvase) {
            setNombreEnvase('');
            setLitrosPorEnvase('');
            setSaborGelato('');
            setHeladero('');
            setCantidad('');
            setEditando(false);
            setError('');
        }
    }, [codigoEnvase, envases]);

    const guardarEnvase = () => {
        setError('');
        if (!codigoEnvase || !nombreEnvase || !litrosPorEnvase || !saborGelato || !heladero || !cantidad) {
            setError('Completa todos los campos.');
            return;
        }

        if (editando) {
            const envasesActualizados = envases.map((e) =>
                e.codigoEnvase === codigoEnvase
                    ? { codigoEnvase, nombreEnvase, litrosPorEnvase, saborGelato, heladero, cantidad }
                    : e
            );
            setEnvases(envasesActualizados);
            localStorage.setItem('envases', JSON.stringify(envasesActualizados));
            resetForm();
            return;
        }

        if (envases.some((e) => e.codigoEnvase === codigoEnvase)) {
            setError('No se pueden registrar dos envases con el mismo código.');
            return;
        }

        const nuevoEnvase = { codigoEnvase, nombreEnvase, litrosPorEnvase, saborGelato, heladero, cantidad };
        const envasesActualizados = [...envases, nuevoEnvase];
        setEnvases(envasesActualizados);
        localStorage.setItem('envases', JSON.stringify(envasesActualizados));
        resetForm();
    };

    const cargarEnvase = (envase: Envase) => {
        setCodigoEnvase(getSafeString(envase.codigoEnvase));
        setNombreEnvase(getSafeString(envase.nombreEnvase));
        setLitrosPorEnvase(getSafeString(envase.litrosPorEnvase));
        setSaborGelato(getSafeString(envase.saborGelato));
        setHeladero(getSafeString(envase.heladero));
        setCantidad(getSafeString(envase.cantidad));
        setEditando(true);
        setError('');
    };

    const eliminarEnvase = (codigo: string) => {
        const envasesActualizados = envases.filter((e) => e.codigoEnvase !== codigo);
        setEnvases(envasesActualizados);
        localStorage.setItem('envases', JSON.stringify(envasesActualizados));
        resetForm();
    };

    const resetForm = () => {
        setCodigoEnvase('');
        setNombreEnvase('');
        setLitrosPorEnvase('');
        setSaborGelato('');
        setHeladero('');
        setCantidad('');
        setEditando(false);
        setError('');
    };

    return (
        <Grid container spacing={3} sx={{ padding: 3 }}>
            <Grid item xs={12}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ textAlign: 'center', fontWeight: 'bold' }}
                >
                    Gestionar Envase
                </Typography>
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ textAlign: 'center', color: '#555' }}
                >
                    Envase de Gelato
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: '#00796b', fontWeight: 'bold' }}
                    >
                        {editando ? 'Modificar Envase' : 'Registrar Envase'}
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            guardarEnvase();
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Código del Envase"
                                    variant="outlined"
                                    fullWidth
                                    value={codigoEnvase}
                                    onChange={(e) => setCodigoEnvase(e.target.value)}
                                    inputProps={{ maxLength: 10 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Nombre del Envase"
                                    variant="outlined"
                                    fullWidth
                                    value={nombreEnvase}
                                    onChange={(e) => setNombreEnvase(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Litros por Envase"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    value={litrosPorEnvase}
                                    onChange={(e) => setLitrosPorEnvase(e.target.value)}
                                    inputProps={{ min: 0 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    select
                                    label="Sabor Gelato"
                                    variant="outlined"
                                    fullWidth
                                    value={saborGelato}
                                    onChange={(e) => setSaborGelato(e.target.value)}
                                >
                                    {sabores.map((s) => (
                                        <MenuItem key={s.codigoSabor} value={s.codigoSabor}>
                                            {s.nombreSabor}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    select
                                    label="Heladero"
                                    variant="outlined"
                                    fullWidth
                                    value={heladero}
                                    onChange={(e) => setHeladero(e.target.value)}
                                >
                                    {heladeros.map((h) => (
                                        <MenuItem key={h.codigo} value={h.codigo}>
                                            {h.nombre}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Cantidad"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    value={cantidad}
                                    onChange={(e) => setCantidad(e.target.value)}
                                    inputProps={{ min: 0 }}
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
                                    {editando ? 'Modificar Envase' : 'Registrar Envase'}
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

            {/* Mostrar envases guardados */}
            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: '#00796b', fontWeight: 'bold' }}
                    >
                        Envases Registrados
                    </Typography>
                    <Grid container spacing={2}>
                        {envases.length === 0 ? (
                            <Typography variant="body1" sx={{ width: '100%' }}>
                                No hay envases registrados.
                            </Typography>
                        ) : (
                            envases.map((item, index) => (
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
                                            <Typography variant="body1">
                                                {`Código: ${getSafeString(item.codigoEnvase)}`}
                                            </Typography>
                                            <Typography variant="body1">
                                                {`Nombre: ${getSafeString(item.nombreEnvase)}`}
                                            </Typography>
                                            <Typography variant="body1">
                                                {`Litros por Envase: ${getSafeString(item.litrosPorEnvase)}`}
                                            </Typography>
                                            <Typography variant="body1">
                                                {`Sabor Gelato: ${sabores.find((s) => s.codigoSabor === item.saborGelato)?.nombreSabor ||
                                                    getSafeString(item.saborGelato)
                                                    }`}
                                            </Typography>
                                            <Typography variant="body1">
                                                {`Heladero: ${heladeros.find((h) => h.codigo === item.heladero)?.nombre ||
                                                    getSafeString(item.heladero)
                                                    }`}
                                            </Typography>
                                            <Typography variant="body1">
                                                {`Cantidad: ${getSafeString(item.cantidad)}`}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Button
                                                color="primary"
                                                onClick={() => cargarEnvase(item)}
                                                sx={{ marginRight: 1 }}
                                            >
                                                Modificar
                                            </Button>
                                            <Button
                                                color="error"
                                                onClick={() => eliminarEnvase(getSafeString(item.codigoEnvase))}
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

export default EnvasePage;