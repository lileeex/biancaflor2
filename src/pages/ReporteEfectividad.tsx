import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, Alert, MenuItem } from '@mui/material';

interface ReporteEfectividadItem {
    codigo: string;
    codigoLote: string;
    saborGelato: string;
    litrosAProducir: string;
    litrosProducidos: string;
    efectividad: string;
    fecha: string;
}

interface Lote {
    codigoLote: string;
    saborGelato: string;
}

interface Sabor {
    codigoSabor: string;
    nombreSabor: string;
}

const getSafeString = (value: any) => (typeof value === 'string' ? value : '');

const ReporteEfectividad = () => {
    const [items, setItems] = useState<ReporteEfectividadItem[]>([]);
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [sabores, setSabores] = useState<Sabor[]>([]);
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState<ReporteEfectividadItem>({
        codigo: '',
        codigoLote: '',
        saborGelato: '',
        litrosAProducir: '',
        litrosProducidos: '',
        efectividad: '',
        fecha: '',
    });

    useEffect(() => {
        setItems(JSON.parse(localStorage.getItem('reporteEfectividad') || '[]'));
        setLotes(JSON.parse(localStorage.getItem('lotes') || '[]'));
        setSabores(JSON.parse(localStorage.getItem('sabores') || '[]'));
    }, []);

    // Cuando cambia el lote, actualiza el sabor relacionado
    useEffect(() => {
        if (form.codigoLote) {
            const lote = lotes.find(l => l.codigoLote === form.codigoLote);
            if (lote) {
                setForm(f => ({
                    ...f,
                    saborGelato: lote.saborGelato
                }));
            }
        }
    }, [form.codigoLote, lotes]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const calcularEfectividad = () => {
        const litrosA = parseFloat(form.litrosAProducir);
        const litrosP = parseFloat(form.litrosProducidos);
        if (!isNaN(litrosA) && litrosA > 0 && !isNaN(litrosP)) {
            const efectividad = ((litrosP / litrosA) * 100).toFixed(2) + '%';
            setForm({ ...form, efectividad });
        } else {
            setForm({ ...form, efectividad: '' });
        }
    };

    const guardarItem = () => {
        setError('');
        const { codigo, codigoLote, saborGelato, litrosAProducir, litrosProducidos, efectividad, fecha } = form;
        if (!codigo || !codigoLote || !saborGelato || !litrosAProducir || !litrosProducidos || !efectividad || !fecha) {
            setError('Completa todos los campos.');
            return;
        }

        if (editando) {
            const itemsActualizados = items.map((i) =>
                i.codigo === codigo ? { ...form } : i
            );
            setItems(itemsActualizados);
            localStorage.setItem('reporteEfectividad', JSON.stringify(itemsActualizados));
            resetForm();
            return;
        }

        if (items.some((i) => i.codigo === codigo)) {
            setError('No se pueden registrar dos reportes con el mismo código.');
            return;
        }

        const nuevoItem = { ...form };
        const itemsActualizados = [...items, nuevoItem];
        setItems(itemsActualizados);
        localStorage.setItem('reporteEfectividad', JSON.stringify(itemsActualizados));
        resetForm();
    };

    const cargarItem = (item: ReporteEfectividadItem) => {
        setForm({ ...item });
        setEditando(true);
        setError('');
    };

    const eliminarItem = (codigo: string) => {
        const itemsActualizados = items.filter((i) => i.codigo !== codigo);
        setItems(itemsActualizados);
        localStorage.setItem('reporteEfectividad', JSON.stringify(itemsActualizados));
        resetForm();
    };

    const resetForm = () => {
        setForm({
            codigo: '',
            codigoLote: '',
            saborGelato: '',
            litrosAProducir: '',
            litrosProducidos: '',
            efectividad: '',
            fecha: '',
        });
        setEditando(false);
        setError('');
    };

    // Mostrar nombre del sabor
    const saborNombre = form.saborGelato
        ? sabores.find((s) => s.codigoSabor === form.saborGelato)?.nombreSabor || form.saborGelato
        : '';

    return (
        <Grid container spacing={3} sx={{ padding: 3 }}>
            <Grid item xs={12}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ textAlign: 'center', fontWeight: 'bold' }}
                >
                    Reporte de Efectividad
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: '#00796b', fontWeight: 'bold' }}
                    >
                        {editando ? 'Modificar Reporte' : 'Registrar Reporte'}
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            guardarItem();
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Código"
                                    name="codigo"
                                    variant="outlined"
                                    fullWidth
                                    value={form.codigo}
                                    onChange={handleChange}
                                    disabled={editando}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    select
                                    label="Nº de Lote"
                                    name="codigoLote"
                                    variant="outlined"
                                    fullWidth
                                    value={form.codigoLote}
                                    onChange={handleChange}
                                >
                                    {lotes.map((l) => (
                                        <MenuItem key={l.codigoLote} value={l.codigoLote}>
                                            {l.codigoLote}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {form.saborGelato && (
                                <Grid item xs={12} md={4}>
                                    <Typography variant="body1" sx={{ mt: 2 }}>
                                        <b>Sabor Gelato:</b> {saborNombre}
                                    </Typography>
                                </Grid>
                            )}
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Litros a Producir"
                                    name="litrosAProducir"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    value={form.litrosAProducir}
                                    onChange={handleChange}
                                    inputProps={{ min: 0 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Litros Producidos"
                                    name="litrosProducidos"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    value={form.litrosProducidos}
                                    onChange={handleChange}
                                    inputProps={{ min: 0 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Efectividad"
                                    name="efectividad"
                                    variant="outlined"
                                    fullWidth
                                    value={form.efectividad}
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Fecha"
                                    name="fecha"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    value={form.fecha}
                                    onChange={handleChange}
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
                                    {editando ? 'Modificar Reporte' : 'Registrar Reporte'}
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={calcularEfectividad}
                                    fullWidth
                                    sx={{ mt: 1 }}
                                >
                                    Generar Efectividad
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

            {/* Mostrar reportes guardados */}
            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: '#00796b', fontWeight: 'bold', mb: 4 }}
                    >
                        Reportes de Efectividad Registrados
                    </Typography>
                    <Grid container spacing={2}>
                        {items.length === 0 ? (
                            <Typography variant="body1" sx={{ width: '100%', mb: 6 }}>
                                No hay reportes de efectividad registrados.
                            </Typography>
                        ) : (
                            items.map((item, index) => {
                                const lote = lotes.find((l) => l.codigoLote === item.codigoLote);
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
                                                    {`Nº de Lote: ${getSafeString(item.codigoLote)}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Sabor Gelato: ${saborNombre}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Litros a Producir: ${getSafeString(item.litrosAProducir)}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Litros Producidos: ${getSafeString(item.litrosProducidos)}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Efectividad: ${getSafeString(item.efectividad)}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Fecha: ${getSafeString(item.fecha)}`}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Button
                                                    color="primary"
                                                    onClick={() => cargarItem(item)}
                                                    sx={{ marginRight: 1 }}
                                                >
                                                    Modificar
                                                </Button>
                                                <Button
                                                    color="error"
                                                    onClick={() => eliminarItem(getSafeString(item.codigo))}
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

export default ReporteEfectividad;