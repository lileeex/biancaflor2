import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, Alert, MenuItem } from '@mui/material';

interface ReporteInventarioItem {
    codigoInventario: string;
    nombreProducto: string;
    entradas: string;
    salidas: string;
    existencias: string;
    fecha: string;
}

interface Inventario {
    codigoInventario: string;
    nombreProducto: string;
}

const getSafeString = (value: any) => (typeof value === 'string' ? value : '');

const ReporteInventario = () => {
    const [items, setItems] = useState<ReporteInventarioItem[]>([]);
    const [inventarios, setInventarios] = useState<Inventario[]>([]);
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState<ReporteInventarioItem>({
        codigoInventario: '',
        nombreProducto: '',
        entradas: '',
        salidas: '',
        existencias: '',
        fecha: '',
    });

    useEffect(() => {
        setItems(JSON.parse(localStorage.getItem('reporteInventario') || '[]'));
        setInventarios(JSON.parse(localStorage.getItem('inventarios') || '[]'));
    }, []);

    // Cuando cambia el código de inventario, actualiza el nombre del producto
    useEffect(() => {
        if (form.codigoInventario) {
            const inv = inventarios.find(i => i.codigoInventario === form.codigoInventario);
            if (inv) {
                setForm(f => ({
                    ...f,
                    nombreProducto: inv.nombreProducto
                }));
            }
        }
    }, [form.codigoInventario, inventarios]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const generarExistencias = () => {
        const entradas = parseFloat(form.entradas);
        const salidas = parseFloat(form.salidas);
        if (!isNaN(entradas) && !isNaN(salidas)) {
            const existencias = (entradas - salidas).toString();
            setForm({ ...form, existencias });
        } else {
            setForm({ ...form, existencias: '' });
        }
    };

    const guardarItem = () => {
        setError('');
        const { codigoInventario, nombreProducto, entradas, salidas, existencias, fecha } = form;
        if (!codigoInventario || !nombreProducto || !entradas || !salidas || !existencias || !fecha) {
            setError('Completa todos los campos.');
            return;
        }

        if (editando) {
            const itemsActualizados = items.map((i) =>
                i.codigoInventario === codigoInventario && i.fecha === fecha ? { ...form } : i
            );
            setItems(itemsActualizados);
            localStorage.setItem('reporteInventario', JSON.stringify(itemsActualizados));
            resetForm();
            return;
        }

        if (items.some((i) => i.codigoInventario === codigoInventario && i.fecha === fecha)) {
            setError('Ya existe un reporte para este inventario y fecha.');
            return;
        }

        const nuevoItem = { ...form };
        const itemsActualizados = [...items, nuevoItem];
        setItems(itemsActualizados);
        localStorage.setItem('reporteInventario', JSON.stringify(itemsActualizados));
        resetForm();
    };

    const cargarItem = (item: ReporteInventarioItem) => {
        setForm({ ...item });
        setEditando(true);
        setError('');
    };

    const eliminarItem = (codigoInventario: string, fecha: string) => {
        const itemsActualizados = items.filter((i) => !(i.codigoInventario === codigoInventario && i.fecha === fecha));
        setItems(itemsActualizados);
        localStorage.setItem('reporteInventario', JSON.stringify(itemsActualizados));
        resetForm();
    };

    const resetForm = () => {
        setForm({
            codigoInventario: '',
            nombreProducto: '',
            entradas: '',
            salidas: '',
            existencias: '',
            fecha: '',
        });
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
                    Reporte de Inventario
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
                                    select
                                    label="Código Inventario"
                                    name="codigoInventario"
                                    variant="outlined"
                                    fullWidth
                                    value={form.codigoInventario}
                                    onChange={handleChange}
                                >
                                    {inventarios.map((i) => (
                                        <MenuItem key={i.codigoInventario} value={i.codigoInventario}>
                                            {i.codigoInventario}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {form.nombreProducto && (
                                <Grid item xs={12} md={4}>
                                    <Typography variant="body1" sx={{ mt: 2 }}>
                                        <b>Nombre Producto:</b> {form.nombreProducto}
                                    </Typography>
                                </Grid>
                            )}
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Entradas"
                                    name="entradas"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    value={form.entradas}
                                    onChange={handleChange}
                                    inputProps={{ min: 0 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Salidas"
                                    name="salidas"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    value={form.salidas}
                                    onChange={handleChange}
                                    inputProps={{ min: 0 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Existencias"
                                    name="existencias"
                                    variant="outlined"
                                    fullWidth
                                    value={form.existencias}
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
                                    onClick={generarExistencias}
                                    fullWidth
                                    sx={{ mt: 1 }}
                                >
                                    Generar Existencias
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
                        Reportes de Inventario Registrados
                    </Typography>
                    <Grid container spacing={2}>
                        {items.length === 0 ? (
                            <Typography variant="body1" sx={{ width: '100%', mb: 6 }}>
                                No hay reportes de inventario registrados.
                            </Typography>
                        ) : (
                            items.map((item, index) => (
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
                                                {`Código Inventario: ${getSafeString(item.codigoInventario)}`}
                                            </Typography>
                                            <Typography variant="body1">
                                                {`Nombre Producto: ${getSafeString(item.nombreProducto)}`}
                                            </Typography>
                                            <Typography variant="body1">
                                                {`Entradas: ${getSafeString(item.entradas)}`}
                                            </Typography>
                                            <Typography variant="body1">
                                                {`Salidas: ${getSafeString(item.salidas)}`}
                                            </Typography>
                                            <Typography variant="body1">
                                                {`Existencias: ${getSafeString(item.existencias)}`}
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
                                                onClick={() => eliminarItem(getSafeString(item.codigoInventario), getSafeString(item.fecha))}
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

export default ReporteInventario;