import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, Alert, MenuItem } from '@mui/material';

interface Envasado {
    codigoEnvasado: string;
    codigoLote: string;
    codigoEnvase: string;
    fecha: string;
    litrosPorEnvase: string;
    cantidad: string;
}

interface Lote {
    codigoLote: string;
    heladero: string;
    saborGelato: string;
}

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

const EnvasadoPage = () => {
    const [codigoEnvasado, setCodigoEnvasado] = useState('');
    const [codigoLote, setCodigoLote] = useState('');
    const [codigoEnvase, setCodigoEnvase] = useState('');
    const [fecha, setFecha] = useState('');
    const [litrosPorEnvase, setLitrosPorEnvase] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [envasados, setEnvasados] = useState<Envasado[]>([]);
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [envases, setEnvases] = useState<Envase[]>([]);
    const [sabores, setSabores] = useState<Sabor[]>([]);
    const [heladeros, setHeladeros] = useState<Heladero[]>([]);
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState('');

    // Datos relacionados
    const loteSeleccionado = lotes.find((l) => l.codigoLote === codigoLote) || null;
    const envaseSeleccionado = envases.find((e) => e.codigoEnvase === codigoEnvase) || null;

    useEffect(() => {
        setEnvasados(JSON.parse(localStorage.getItem('envasados') || '[]'));
        setLotes(JSON.parse(localStorage.getItem('lotes') || '[]'));
        setEnvases(JSON.parse(localStorage.getItem('envases') || '[]'));
        setSabores(JSON.parse(localStorage.getItem('sabores') || '[]'));
        setHeladeros(JSON.parse(localStorage.getItem('heladeros') || '[]'));
    }, []);

    // Cuando cambia el código de envasado, si existe, carga los datos
    useEffect(() => {
        const envasadoExistente = envasados.find((e) => e.codigoEnvasado === codigoEnvasado);
        if (envasadoExistente) {
            setCodigoLote(getSafeString(envasadoExistente.codigoLote));
            setCodigoEnvase(getSafeString(envasadoExistente.codigoEnvase));
            setFecha(getSafeString(envasadoExistente.fecha));
            setLitrosPorEnvase(getSafeString(envasadoExistente.litrosPorEnvase));
            setCantidad(getSafeString(envasadoExistente.cantidad));
            setEditando(true);
            setError('');
        } else if (codigoEnvasado) {
            setCodigoLote('');
            setCodigoEnvase('');
            setFecha('');
            setLitrosPorEnvase('');
            setCantidad('');
            setEditando(false);
            setError('');
        }
    }, [codigoEnvasado, envasados]);

    // Cuando cambia el código de envase, si existe, carga los litros por envase
    useEffect(() => {
        if (codigoEnvase) {
            const envase = envases.find((e) => e.codigoEnvase === codigoEnvase);
            if (envase) {
                setLitrosPorEnvase(getSafeString(envase.litrosPorEnvase));
            }
        }
    }, [codigoEnvase, envases]);

    const guardarEnvasado = () => {
        setError('');
        if (!codigoEnvasado || !codigoLote || !codigoEnvase || !fecha || !litrosPorEnvase || !cantidad) {
            setError('Completa todos los campos.');
            return;
        }

        if (!loteSeleccionado) {
            setError('El lote no existe. Regístrelo primero.');
            return;
        }
        if (!envaseSeleccionado) {
            setError('El envase no existe. Regístrelo primero.');
            return;
        }

        if (editando) {
            const envasadosActualizados = envasados.map((e) =>
                e.codigoEnvasado === codigoEnvasado
                    ? { codigoEnvasado, codigoLote, codigoEnvase, fecha, litrosPorEnvase, cantidad }
                    : e
            );
            setEnvasados(envasadosActualizados);
            localStorage.setItem('envasados', JSON.stringify(envasadosActualizados));
            resetForm();
            return;
        }

        if (envasados.some((e) => e.codigoEnvasado === codigoEnvasado)) {
            setError('No se pueden registrar dos envasados con el mismo código.');
            return;
        }

        const nuevoEnvasado = { codigoEnvasado, codigoLote, codigoEnvase, fecha, litrosPorEnvase, cantidad };
        const envasadosActualizados = [...envasados, nuevoEnvasado];
        setEnvasados(envasadosActualizados);
        localStorage.setItem('envasados', JSON.stringify(envasadosActualizados));
        resetForm();
    };

    const cargarEnvasado = (envasado: Envasado) => {
        setCodigoEnvasado(getSafeString(envasado.codigoEnvasado));
        setCodigoLote(getSafeString(envasado.codigoLote));
        setCodigoEnvase(getSafeString(envasado.codigoEnvase));
        setFecha(getSafeString(envasado.fecha));
        setLitrosPorEnvase(getSafeString(envasado.litrosPorEnvase));
        setCantidad(getSafeString(envasado.cantidad));
        setEditando(true);
        setError('');
    };

    const eliminarEnvasado = (codigo: string) => {
        const envasadosActualizados = envasados.filter((e) => e.codigoEnvasado !== codigo);
        setEnvasados(envasadosActualizados);
        localStorage.setItem('envasados', JSON.stringify(envasadosActualizados));
        resetForm();
    };

    const resetForm = () => {
        setCodigoEnvasado('');
        setCodigoLote('');
        setCodigoEnvase('');
        setFecha('');
        setLitrosPorEnvase('');
        setCantidad('');
        setEditando(false);
        setError('');
    };

    // Datos relacionados para mostrar
    const heladeroNombre = loteSeleccionado
        ? heladeros.find((h) => h.codigo === loteSeleccionado.heladero)?.nombre || loteSeleccionado.heladero
        : '';
    const saborNombre = loteSeleccionado
        ? sabores.find((s) => s.codigoSabor === loteSeleccionado.saborGelato)?.nombreSabor || loteSeleccionado.saborGelato
        : '';
    const nombreEnvase = envaseSeleccionado
        ? envaseSeleccionado.nombreEnvase
        : '';

    return (
        <Grid container spacing={3} sx={{ padding: 3 }}>
            <Grid item xs={12}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ textAlign: 'center', fontWeight: 'bold' }}
                >
                    Gestionar Envasado
                </Typography>
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ textAlign: 'center', color: '#555' }}
                >
                    Envasado de Gelato
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: '#00796b', fontWeight: 'bold' }}
                    >
                        {editando ? 'Modificar Envasado' : 'Registrar Envasado'}
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            guardarEnvasado();
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Código del Envasado"
                                    variant="outlined"
                                    fullWidth
                                    value={codigoEnvasado}
                                    onChange={(e) => setCodigoEnvasado(e.target.value)}
                                    inputProps={{ maxLength: 10 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    select
                                    label="Código de Lote"
                                    variant="outlined"
                                    fullWidth
                                    value={codigoLote}
                                    onChange={(e) => setCodigoLote(e.target.value)}
                                >
                                    {lotes.map((l) => (
                                        <MenuItem key={l.codigoLote} value={l.codigoLote}>
                                            {l.codigoLote}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    select
                                    label="Código de Envase"
                                    variant="outlined"
                                    fullWidth
                                    value={codigoEnvase}
                                    onChange={(e) => setCodigoEnvase(e.target.value)}
                                >
                                    {envases.map((e) => (
                                        <MenuItem key={e.codigoEnvase} value={e.codigoEnvase}>
                                            {e.codigoEnvase}
                                        </MenuItem>
                                    ))}
                                </TextField>
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
                                            <b>Sabor Gelato:</b> {saborNombre}
                                        </Typography>
                                    </Grid>
                                </>
                            )}
                            {envaseSeleccionado && (
                                <>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1">
                                            <b>Nombre Envase:</b> {nombreEnvase}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1">
                                            <b>Litros por Envase:</b> {envaseSeleccionado.litrosPorEnvase}
                                        </Typography>
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Fecha de Envasado"
                                    variant="outlined"
                                    type="date"
                                    fullWidth
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
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
                                    {editando ? 'Modificar Envasado' : 'Registrar Envasado'}
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

            {/* Mostrar envasados guardados */}
            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: '#00796b', fontWeight: 'bold' }}
                    >
                        Envasados Registrados
                    </Typography>
                    <Grid container spacing={2}>
                        {envasados.length === 0 ? (
                            <Typography variant="body1" sx={{ width: '100%' }}>
                                No hay envasados registrados.
                            </Typography>
                        ) : (
                            envasados.map((item, index) => {
                                const lote = lotes.find((l) => l.codigoLote === item.codigoLote);
                                const envase = envases.find((e) => e.codigoEnvase === item.codigoEnvase);
                                const heladeroNombre = lote
                                    ? heladeros.find((h) => h.codigo === lote.heladero)?.nombre || lote.heladero
                                    : '';
                                const saborNombre = lote
                                    ? sabores.find((s) => s.codigoSabor === lote.saborGelato)?.nombreSabor || lote.saborGelato
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
                                                <Typography variant="body1">
                                                    {`Código Envasado: ${getSafeString(item.codigoEnvasado)}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Código Lote: ${getSafeString(item.codigoLote)}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Sabor Gelato: ${saborNombre}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Heladero: ${heladeroNombre}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Código Envase: ${getSafeString(item.codigoEnvase)}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Nombre Envase: ${envase?.nombreEnvase || ''}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Litros por Envase: ${getSafeString(item.litrosPorEnvase)}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Cantidad: ${getSafeString(item.cantidad)}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Fecha: ${getSafeString(item.fecha)}`}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Button
                                                    color="primary"
                                                    onClick={() => cargarEnvasado(item)}
                                                    sx={{ marginRight: 1 }}
                                                >
                                                    Modificar
                                                </Button>
                                                <Button
                                                    color="error"
                                                    onClick={() => eliminarEnvasado(getSafeString(item.codigoEnvasado))}
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

export default EnvasadoPage;