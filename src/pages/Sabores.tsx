import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';

const Sabores = () => {
    const [codigoSabor, setCodigoSabor] = useState('');
    const [nombreSabor, setNombreSabor] = useState('');
    const [detalles, setDetalles] = useState('');
    const [stock, setStock] = useState('');
    const [fecha, setFecha] = useState('');
    const [sabores, setSabores] = useState<any[]>([]);
    const [editando, setEditando] = useState<boolean>(false); // Flag para determinar si estamos editando

    // Sabores predeterminados
    const tiposSabores = [
        { codigo: '001', nombre: 'Gelato Snicker' },
        { codigo: '002', nombre: 'Gelato Biancaflor' },
        { codigo: '003', nombre: 'Gelato Pavlova' },
        { codigo: '004', nombre: 'Gelato Pasas al Ron' },
        { codigo: '005', nombre: 'Gelato Blondie' },
        { codigo: '006', nombre: 'Gelato Pie de Limón' },
        { codigo: '007', nombre: 'Gelato Crema Americana' },
        { codigo: '008', nombre: 'Gelato Cookies and Cream' },
        { codigo: '009', nombre: 'Gelato Dulce de Leche' },
        { codigo: '010', nombre: 'Gelato Pistacho' },
        { codigo: '011', nombre: 'Gelato Mango' },
        { codigo: '012', nombre: 'Gelato Brownie' },
        { codigo: '013', nombre: 'Gelato Açai (sin azúcar)' },
        { codigo: '014', nombre: 'Gelato Yogurt Griego (sin azúcar)' },
        { codigo: '015', nombre: 'Gelato Guayaba (sin azúcar)' },
        { codigo: '016', nombre: 'Gelato Achachairu (sin azúcar)' },
    ];

    // Cargar los datos desde LocalStorage al iniciar
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('sabores') || '[]');
        setSabores(data);
    }, []);

    // Guardar el sabor
    const guardarSabor = () => {
        const nuevoSabor = [...sabores, { codigoSabor, nombreSabor, detalles, stock, fecha }];
        setSabores(nuevoSabor);
        localStorage.setItem('sabores', JSON.stringify(nuevoSabor));
        resetForm();
    };

    // Modificar un sabor en el inventario
    const modificarSabor = () => {
        const nuevoSabor = sabores.map((item) => {
            if (item.codigoSabor === codigoSabor) {
                return { ...item, nombreSabor, detalles, stock, fecha };
            }
            return item;
        });
        setSabores(nuevoSabor);
        localStorage.setItem('sabores', JSON.stringify(nuevoSabor));
        resetForm();
    };

    // Eliminar un sabor del inventario
    const eliminarSabor = (codigo: string) => {
        const saboresFiltrados = sabores.filter((item) => item.codigoSabor !== codigo);
        setSabores(saboresFiltrados);
        localStorage.setItem('sabores', JSON.stringify(saboresFiltrados));
    };

    // Limpiar el formulario
    const resetForm = () => {
        setCodigoSabor('');
        setNombreSabor('');
        setDetalles('');
        setStock('');
        setFecha('');
        setEditando(false);
    };

    const handleEditar = (sabor: any) => {
        setCodigoSabor(sabor.codigoSabor);
        setNombreSabor(sabor.nombreSabor);
        setDetalles(sabor.detalles);
        setStock(sabor.stock);
        setFecha(sabor.fecha);
        setEditando(true);
    };

    return (
        <Grid container spacing={3} sx={{ padding: 3 }}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Gestionar Sabores
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#00796b', fontWeight: 'bold' }}>
                        Añadir/Modificar Sabor al Inventario
                    </Typography>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Código de Sabor"
                                    variant="outlined"
                                    fullWidth
                                    value={codigoSabor}
                                    onChange={(e) => setCodigoSabor(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Seleccionar Sabor</InputLabel>
                                    <Select
                                        value={nombreSabor}
                                        onChange={(e) => setNombreSabor(e.target.value)}
                                    >
                                        {tiposSabores.map((sabor) => (
                                            <MenuItem key={sabor.codigo} value={sabor.nombre}>
                                                {sabor.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Detalles"
                                    variant="outlined"
                                    fullWidth
                                    value={detalles}
                                    onChange={(e) => setDetalles(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Stock Disponible"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
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
                                {editando ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={modificarSabor}
                                        fullWidth
                                        sx={{
                                            backgroundColor: '#00796b',
                                            '&:hover': { backgroundColor: '#004d40' },
                                            borderRadius: 2,
                                            padding: '12px',
                                        }}
                                    >
                                        Modificar Sabor
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={guardarSabor}
                                        fullWidth
                                        sx={{
                                            backgroundColor: '#00796b',
                                            '&:hover': { backgroundColor: '#004d40' },
                                            borderRadius: 2,
                                            padding: '12px',
                                        }}
                                    >
                                        Insertar Sabor
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>

            {/* Mostrar sabores guardados en una tabla */}
            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#00796b', fontWeight: 'bold', mb: 4 }}>
                        Sabores Guardados
                    </Typography>
                    <Grid container spacing={2}>
                        {sabores.length === 0 ? (
                            <Typography variant="body1" sx={{ width: '100%', mb: 6 }}>
                                No hay sabores guardados.
                            </Typography>
                        ) : (
                            sabores.map((item, index) => (
                                <Grid item xs={12} key={index}>
                                    <Paper sx={{ padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: 1 }}>
                                        <Typography variant="body1">{`Código: ${item.codigoSabor}`}</Typography>
                                        <Typography variant="body1">{`Sabor: ${item.nombreSabor}`}</Typography>
                                        <Typography variant="body1">{`Detalles: ${item.detalles}`}</Typography>
                                        <Typography variant="body1">{`Stock: ${item.stock}`}</Typography>
                                        <Typography variant="body1">{`Fecha: ${item.fecha}`}</Typography>
                                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => eliminarSabor(item.codigoSabor)}
                                            >
                                                Eliminar
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleEditar(item)}
                                            >
                                                Editar
                                            </Button>
                                        </Box>
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

export default Sabores;
