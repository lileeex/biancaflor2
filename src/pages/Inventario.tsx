// src/pages/Inventario.tsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';

const Inventario = () => {
    const [codigoProducto, setCodigoProducto] = useState('');
    const [tipoProducto, setTipoProducto] = useState('');
    const [nombreProducto, setNombreProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fecha, setFecha] = useState('');
    const [inventario, setInventario] = useState<any[]>([]);
    const [editando, setEditando] = useState<boolean>(false); // Flag para determinar si estamos editando

    // Productos predeterminados en el tipo de producto
    const tiposProducto = [
        { codigo: '001', nombre: 'Crema Americana' },
        { codigo: '002', nombre: 'Açai' },
        { codigo: '003', nombre: 'Yogurt Griego' },
        { codigo: '004', nombre: 'Guayaba' },
        { codigo: '005', nombre: 'Achachairu' },
        { codigo: '006', nombre: 'Mango' },
        { codigo: '007', nombre: 'Pistacho' },
        { codigo: '008', nombre: 'Dulce de Leche' },
        { codigo: '009', nombre: 'Brownie' },
        { codigo: '010', nombre: 'Pie de Limón' },
    ];

    // Cargar los datos desde LocalStorage al iniciar
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('inventario') || '[]');
        setInventario(data);
    }, []);

    // Guardar los datos en LocalStorage
    const guardarInventario = () => {
        const nuevoInventario = [...inventario, { codigoProducto, tipoProducto, nombreProducto, cantidad, fecha }];
        setInventario(nuevoInventario);
        localStorage.setItem('inventario', JSON.stringify(nuevoInventario));
        resetForm();
    };

    // Modificar un producto en el inventario
    const modificarInventario = () => {
        const nuevoInventario = inventario.map((item) => {
            if (item.codigoProducto === codigoProducto) {
                return { ...item, tipoProducto, nombreProducto, cantidad, fecha };
            }
            return item;
        });
        setInventario(nuevoInventario);
        localStorage.setItem('inventario', JSON.stringify(nuevoInventario));
        resetForm();
    };

    // Eliminar un producto del inventario
    const eliminarProducto = (codigo: string) => {
        const productosFiltrados = inventario.filter((item) => item.codigoProducto !== codigo);
        setInventario(productosFiltrados);
        localStorage.setItem('inventario', JSON.stringify(productosFiltrados));
    };

    // Limpiar el formulario
    const resetForm = () => {
        setCodigoProducto('');
        setTipoProducto('');
        setNombreProducto('');
        setCantidad('');
        setFecha('');
        setEditando(false);
    };

    const handleEditar = (producto: any) => {
        setCodigoProducto(producto.codigoProducto);
        setTipoProducto(producto.tipoProducto);
        setNombreProducto(producto.nombreProducto);
        setCantidad(producto.cantidad);
        setFecha(producto.fecha);
        setEditando(true);
    };

    return (
        <Grid container spacing={3} sx={{ padding: 3, overflowY: 'auto', height: '100vh' }}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Gestionar Inventario
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#00796b', fontWeight: 'bold' }}>
                        Añadir/Modificar Producto al Inventario
                    </Typography>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Código de Producto"
                                    variant="outlined"
                                    fullWidth
                                    value={codigoProducto}
                                    onChange={(e) => setCodigoProducto(e.target.value)}
                                    sx={{ borderRadius: 2 }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Tipo de Producto</InputLabel>
                                    <Select
                                        value={tipoProducto}
                                        onChange={(e) => {
                                            setTipoProducto(e.target.value);
                                            const productoSeleccionado = tiposProducto.find(
                                                (item) => item.codigo === e.target.value
                                            );
                                            setNombreProducto(productoSeleccionado?.nombre || '');
                                        }}
                                    >
                                        {tiposProducto.map((tipo) => (
                                            <MenuItem key={tipo.codigo} value={tipo.codigo}>
                                                {tipo.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Nombre del Producto"
                                    variant="outlined"
                                    fullWidth
                                    value={nombreProducto}
                                    onChange={(e) => setNombreProducto(e.target.value)}
                                    sx={{
                                        borderRadius: 2,
                                        fontWeight: 'bold',
                                        color: 'black',
                                        '& .MuiInputBase-input': {
                                            color: 'black',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Cantidad Disponible"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    value={cantidad}
                                    onChange={(e) => setCantidad(e.target.value)}
                                    sx={{ borderRadius: 2 }}
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
                                    sx={{ borderRadius: 2 }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                {editando ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={modificarInventario}
                                        fullWidth
                                        sx={{
                                            backgroundColor: '#00796b',
                                            '&:hover': { backgroundColor: '#004d40' },
                                            borderRadius: 2,
                                            padding: '12px',
                                        }}
                                    >
                                        Modificar Producto
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={guardarInventario}
                                        fullWidth
                                        sx={{
                                            backgroundColor: '#00796b',
                                            '&:hover': { backgroundColor: '#004d40' },
                                            borderRadius: 2,
                                            padding: '12px',
                                        }}
                                    >
                                        Insertar Producto
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>

            {/* Mostrar productos guardados en una tabla */}
            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#00796b', fontWeight: 'bold' }}>
                        Inventario Actual
                    </Typography>
                    <Grid container spacing={2}>
                        {inventario.length === 0 ? (
                            <Typography variant="body1" sx={{ width: '100%' }}>
                                No hay productos en el inventario.
                            </Typography>
                        ) : (
                            inventario.map((item, index) => (
                                <Grid item xs={12} key={index}>
                                    <Paper sx={{ padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: 1 }}>
                                        <Typography variant="body1">{`Código: ${item.codigoProducto}`}</Typography>
                                        <Typography variant="body1">{`Tipo: ${item.nombreProducto}`}</Typography>
                                        <Typography variant="body1">{`Cantidad: ${item.cantidad}`}</Typography>
                                        <Typography variant="body1">{`Fecha: ${item.fecha}`}</Typography>
                                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => eliminarProducto(item.codigoProducto)}
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

export default Inventario;
