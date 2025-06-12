import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, Alert, MenuItem } from '@mui/material';

interface MateriaPrimaItem {
    codigo: string;
    tipo: string;
    nombre: string;
    cantidad: string;
    fechaIngreso: string;
}

const tiposMateriaPrima = [
    'Lácteos',
    'Frutas',
    'Azúcares',
    'Estabilizantes',
    'Colorantes',
    'Saborizantes',
    'Otros',
];

const getSafeString = (value: any) => (typeof value === 'string' ? value : '');

const MateriaPrima = () => {
    const [items, setItems] = useState<MateriaPrimaItem[]>([]);
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState<MateriaPrimaItem>({
        codigo: '',
        tipo: '',
        nombre: '',
        cantidad: '',
        fechaIngreso: '',
    });

    useEffect(() => {
        setItems(JSON.parse(localStorage.getItem('materiasPrimas') || '[]'));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const guardarItem = () => {
        setError('');
        const { codigo, tipo, nombre, cantidad, fechaIngreso } = form;
        if (!codigo || !tipo || !nombre || !cantidad || !fechaIngreso) {
            setError('Completa todos los campos.');
            return;
        }

        if (editando) {
            const itemsActualizados = items.map((i) =>
                i.codigo === codigo ? { ...form } : i
            );
            setItems(itemsActualizados);
            localStorage.setItem('materiasPrimas', JSON.stringify(itemsActualizados));
            resetForm();
            return;
        }

        if (items.some((i) => i.codigo === codigo)) {
            setError('Ya existe una materia prima con ese código.');
            return;
        }

        const nuevoItem = { ...form };
        const itemsActualizados = [...items, nuevoItem];
        setItems(itemsActualizados);
        localStorage.setItem('materiasPrimas', JSON.stringify(itemsActualizados));
        resetForm();
    };

    const cargarItem = (item: MateriaPrimaItem) => {
        setForm({ ...item });
        setEditando(true);
        setError('');
    };

    const eliminarItem = (codigo: string) => {
        const itemsActualizados = items.filter((i) => i.codigo !== codigo);
        setItems(itemsActualizados);
        localStorage.setItem('materiasPrimas', JSON.stringify(itemsActualizados));
        resetForm();
    };

    const resetForm = () => {
        setForm({
            codigo: '',
            tipo: '',
            nombre: '',
            cantidad: '',
            fechaIngreso: '',
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
                    Gestión de Materia Prima
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: '#00796b', fontWeight: 'bold' }}
                    >
                        {editando ? 'Modificar Materia Prima' : 'Registrar Materia Prima'}
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
                            <Grid item xs={12} md={3}>
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
                            <Grid item xs={12} md={3}>
                                <TextField
                                    select
                                    label="Tipo"
                                    name="tipo"
                                    variant="outlined"
                                    fullWidth
                                    value={form.tipo}
                                    onChange={handleChange}
                                >
                                    {tiposMateriaPrima.map((tipo) => (
                                        <MenuItem key={tipo} value={tipo}>
                                            {tipo}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    label="Nombre"
                                    name="nombre"
                                    variant="outlined"
                                    fullWidth
                                    value={form.nombre}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    label="Cantidad"
                                    name="cantidad"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    value={form.cantidad}
                                    onChange={handleChange}
                                    inputProps={{ min: 0 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    label="Fecha Ingreso"
                                    name="fechaIngreso"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    value={form.fechaIngreso}
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
                                    {editando ? 'Modificar Materia Prima' : 'Registrar Materia Prima'}
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

            {/* Mostrar materias primas guardadas */}
            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: '#00796b', fontWeight: 'bold', mb: 4 }}
                    >
                        Materias Primas Registradas
                    </Typography>
                    <Grid container spacing={2}>
                        {items.length === 0 ? (
                            <Typography variant="body1" sx={{ width: '100%', mb: 6 }}>
                                No hay materias primas registradas.
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
                                                {`Código: ${getSafeString(item.codigo)}`}
                                            </Typography>
                                            <Typography variant="body1">
                                                {`Tipo: ${getSafeString(item.tipo)}`}
                                            </Typography>
                                            <Typography variant="body1">
                                                {`Nombre: ${getSafeString(item.nombre)}`}
                                            </Typography>
                                            <Typography variant="body1">
                                                {`Cantidad: ${getSafeString(item.cantidad)}`}
                                            </Typography>
                                            <Typography variant="body1">
                                                {`Fecha Ingreso: ${getSafeString(item.fechaIngreso)}`}
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
                            ))
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default MateriaPrima;