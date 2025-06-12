import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, Alert, MenuItem } from '@mui/material';

interface ProductoProceso {
    codigoProductoProceso: string;
    codigoLote: string;
    codigoInventario: string;
    nombreProductoProceso: string;
    cantidad: string;
    fecha: string;
}

interface Lote {
    codigoLote: string;
    heladero: string;
    saborGelato: string;
}

interface Sabor {
    codigoSabor: string;
    nombreSabor: string;
}

interface Heladero {
    codigo: string;
    nombre: string;
}

interface Inventario {
    codigoInventario: string;
    nombreProducto: string;
}

const getSafeString = (value: any) => (typeof value === 'string' ? value : '');

const ProductoProceso = () => {
    const [codigoProductoProceso, setCodigoProductoProceso] = useState('');
    const [codigoLote, setCodigoLote] = useState('');
    const [codigoInventario, setCodigoInventario] = useState('');
    const [nombreProductoProceso, setNombreProductoProceso] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fecha, setFecha] = useState('');
    const [productosProceso, setProductosProceso] = useState<ProductoProceso[]>([]);
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [sabores, setSabores] = useState<Sabor[]>([]);
    const [heladeros, setHeladeros] = useState<Heladero[]>([]);
    const [inventarios, setInventarios] = useState<Inventario[]>([]);
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setProductosProceso(JSON.parse(localStorage.getItem('productosProceso') || '[]'));
        setLotes(JSON.parse(localStorage.getItem('lotes') || '[]'));
        setSabores(JSON.parse(localStorage.getItem('sabores') || '[]'));
        setHeladeros(JSON.parse(localStorage.getItem('heladeros') || '[]'));
        setInventarios(JSON.parse(localStorage.getItem('inventarios') || '[]'));
    }, []);

    // Cuando cambia el código, si existe, carga los datos
    useEffect(() => {
        const prodExistente = productosProceso.find((p) => p.codigoProductoProceso === codigoProductoProceso);
        if (prodExistente) {
            setCodigoLote(getSafeString(prodExistente.codigoLote));
            setCodigoInventario(getSafeString(prodExistente.codigoInventario));
            setNombreProductoProceso(getSafeString(prodExistente.nombreProductoProceso));
            setCantidad(getSafeString(prodExistente.cantidad));
            setFecha(getSafeString(prodExistente.fecha));
            setEditando(true);
            setError('');
        } else if (codigoProductoProceso) {
            setCodigoLote('');
            setCodigoInventario('');
            setNombreProductoProceso('');
            setCantidad('');
            setFecha('');
            setEditando(false);
            setError('');
        }
    }, [codigoProductoProceso, productosProceso]);

    // Cuando cambia el código de inventario, si existe, carga el nombre del producto
    useEffect(() => {
        if (codigoInventario) {
            const inv = inventarios.find((i) => i.codigoInventario === codigoInventario);
            if (inv) {
                setNombreProductoProceso(getSafeString(inv.nombreProducto));
            }
        }
    }, [codigoInventario, inventarios]);

    const guardarProductoProceso = () => {
        setError('');
        if (!codigoProductoProceso || !codigoLote || !codigoInventario || !nombreProductoProceso || !cantidad || !fecha) {
            setError('Completa todos los campos.');
            return;
        }

        const loteSeleccionado = lotes.find((l) => l.codigoLote === codigoLote);
        const inventarioSeleccionado = inventarios.find((i) => i.codigoInventario === codigoInventario);

        if (!loteSeleccionado) {
            setError('El lote no existe. Regístrelo primero.');
            return;
        }
        if (!inventarioSeleccionado) {
            setError('El inventario no existe. Regístrelo primero.');
            return;
        }

        if (editando) {
            const productosActualizados = productosProceso.map((p) =>
                p.codigoProductoProceso === codigoProductoProceso
                    ? { codigoProductoProceso, codigoLote, codigoInventario, nombreProductoProceso, cantidad, fecha }
                    : p
            );
            setProductosProceso(productosActualizados);
            localStorage.setItem('productosProceso', JSON.stringify(productosActualizados));
            resetForm();
            return;
        }

        if (productosProceso.some((p) => p.codigoProductoProceso === codigoProductoProceso)) {
            setError('No se pueden registrar dos productos en proceso con el mismo código.');
            return;
        }

        const nuevoProducto = { codigoProductoProceso, codigoLote, codigoInventario, nombreProductoProceso, cantidad, fecha };
        const productosActualizados = [...productosProceso, nuevoProducto];
        setProductosProceso(productosActualizados);
        localStorage.setItem('productosProceso', JSON.stringify(productosActualizados));
        resetForm();
    };

    const cargarProductoProceso = (prod: ProductoProceso) => {
        setCodigoProductoProceso(getSafeString(prod.codigoProductoProceso));
        setCodigoLote(getSafeString(prod.codigoLote));
        setCodigoInventario(getSafeString(prod.codigoInventario));
        setNombreProductoProceso(getSafeString(prod.nombreProductoProceso));
        setCantidad(getSafeString(prod.cantidad));
        setFecha(getSafeString(prod.fecha));
        setEditando(true);
        setError('');
    };

    const eliminarProductoProceso = (codigo: string) => {
        const productosActualizados = productosProceso.filter((p) => p.codigoProductoProceso !== codigo);
        setProductosProceso(productosActualizados);
        localStorage.setItem('productosProceso', JSON.stringify(productosActualizados));
        resetForm();
    };

    const resetForm = () => {
        setCodigoProductoProceso('');
        setCodigoLote('');
        setCodigoInventario('');
        setNombreProductoProceso('');
        setCantidad('');
        setFecha('');
        setEditando(false);
        setError('');
    };

    // Datos relacionados para mostrar
    const loteSeleccionado = lotes.find((l) => l.codigoLote === codigoLote) || null;
    const heladeroNombre = loteSeleccionado
        ? heladeros.find((h) => h.codigo === loteSeleccionado.heladero)?.nombre || loteSeleccionado.heladero
        : '';
    const saborNombre = loteSeleccionado
        ? sabores.find((s) => s.codigoSabor === loteSeleccionado.saborGelato)?.nombreSabor || loteSeleccionado.saborGelato
        : '';
    const inventarioSeleccionado = inventarios.find((i) => i.codigoInventario === codigoInventario) || null;

    return (
        <Grid container spacing={3} sx={{ padding: 3 }}>
            <Grid item xs={12}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ textAlign: 'center', fontWeight: 'bold' }}
                >
                    Gestionar Producto en Proceso
                </Typography>
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ textAlign: 'center', color: '#555' }}
                >
                    Producto en Proceso de Gelato
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: '#00796b', fontWeight: 'bold' }}
                    >
                        {editando ? 'Modificar Producto en Proceso' : 'Registrar Producto en Proceso'}
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            guardarProductoProceso();
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Código Producto Proceso"
                                    variant="outlined"
                                    fullWidth
                                    value={codigoProductoProceso}
                                    onChange={(e) => setCodigoProductoProceso(e.target.value)}
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
                                    label="Código de Inventario"
                                    variant="outlined"
                                    fullWidth
                                    value={codigoInventario}
                                    onChange={(e) => setCodigoInventario(e.target.value)}
                                >
                                    {inventarios.map((i) => (
                                        <MenuItem key={i.codigoInventario} value={i.codigoInventario}>
                                            {i.codigoInventario}
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
                            {inventarioSeleccionado && (
                                <Grid item xs={12} md={4}>
                                    <Typography variant="body1">
                                        <b>Nombre Producto:</b> {inventarioSeleccionado.nombreProducto}
                                    </Typography>
                                </Grid>
                            )}
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
                            <Grid item xs={12} md={4}>
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
                                    type="submit"
                                    fullWidth
                                    sx={{
                                        backgroundColor: '#00796b',
                                        '&:hover': { backgroundColor: '#004d40' },
                                        borderRadius: 2,
                                        padding: '12px',
                                    }}
                                >
                                    {editando ? 'Modificar Producto en Proceso' : 'Registrar Producto en Proceso'}
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

            {/* Mostrar productos en proceso guardados */}
            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: '#00796b', fontWeight: 'bold', mb: 4 }}
                    >
                        Productos en Proceso Registrados
                    </Typography>
                    <Grid container spacing={2}>
                        {productosProceso.length === 0 ? (
                            <Typography variant="body1" sx={{ width: '100%', mb: 6 }}>
                                No hay productos en proceso registrados.
                            </Typography>
                        ) : (
                            productosProceso.map((item, index) => {
                                const lote = lotes.find((l) => l.codigoLote === item.codigoLote);
                                const heladeroNombre = lote
                                    ? heladeros.find((h) => h.codigo === lote.heladero)?.nombre || lote.heladero
                                    : '';
                                const saborNombre = lote
                                    ? sabores.find((s) => s.codigoSabor === lote.saborGelato)?.nombreSabor || lote.saborGelato
                                    : '';
                                const inventario = inventarios.find((i) => i.codigoInventario === item.codigoInventario);
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
                                                    {`Código Producto Proceso: ${getSafeString(item.codigoProductoProceso)}`}
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
                                                    {`Código Inventario: ${getSafeString(item.codigoInventario)}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Nombre Producto: ${inventario?.nombreProducto || ''}`}
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
                                                    onClick={() => cargarProductoProceso(item)}
                                                    sx={{ marginRight: 1 }}
                                                >
                                                    Modificar
                                                </Button>
                                                <Button
                                                    color="error"
                                                    onClick={() => eliminarProductoProceso(getSafeString(item.codigoProductoProceso))}
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

export default ProductoProceso;