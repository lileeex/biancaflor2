import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, Alert, MenuItem } from '@mui/material';

interface ProductoTerminado {
    codigo: string;
    fechaFinalizado: string;
    codigoLote: string;
    saborGelato: string;
    heladero: string;
    litrosPorEnvase: string;
    cantidad: string;
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

const getSafeString = (value: any) => (typeof value === 'string' ? value : '');

const ReporteProductoTerminado = () => {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [productos, setProductos] = useState<ProductoTerminado[]>([]);
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [sabores, setSabores] = useState<Sabor[]>([]);
    const [heladeros, setHeladeros] = useState<Heladero[]>([]);
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState<ProductoTerminado>({
        codigo: '',
        fechaFinalizado: '',
        codigoLote: '',
        saborGelato: '',
        heladero: '',
        litrosPorEnvase: '',
        cantidad: '',
    });

    useEffect(() => {
        setProductos(JSON.parse(localStorage.getItem('productosTerminados') || '[]'));
        setLotes(JSON.parse(localStorage.getItem('lotes') || '[]'));
        setSabores(JSON.parse(localStorage.getItem('sabores') || '[]'));
        setHeladeros(JSON.parse(localStorage.getItem('heladeros') || '[]'));
    }, []);

    // Filtrar productos por rango de fechas
    const productosFiltrados = productos.filter((p) => {
        if (!fechaInicio || !fechaFin) return true;
        return p.fechaFinalizado >= fechaInicio && p.fechaFinalizado <= fechaFin;
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const guardarProducto = () => {
        setError('');
        const { codigo, fechaFinalizado, codigoLote, saborGelato, heladero, litrosPorEnvase, cantidad } = form;
        if (!codigo || !fechaFinalizado || !codigoLote || !saborGelato || !heladero || !litrosPorEnvase || !cantidad) {
            setError('Completa todos los campos.');
            return;
        }

        if (editando) {
            const productosActualizados = productos.map((p) =>
                p.codigo === codigo ? { ...form } : p
            );
            setProductos(productosActualizados);
            localStorage.setItem('productosTerminados', JSON.stringify(productosActualizados));
            resetForm();
            return;
        }

        if (productos.some((p) => p.codigo === codigo)) {
            setError('No se pueden registrar dos productos terminados con el mismo código.');
            return;
        }

        const nuevoProducto = { ...form };
        const productosActualizados = [...productos, nuevoProducto];
        setProductos(productosActualizados);
        localStorage.setItem('productosTerminados', JSON.stringify(productosActualizados));
        resetForm();
    };

    const cargarProducto = (prod: ProductoTerminado) => {
        setForm({ ...prod });
        setEditando(true);
        setError('');
    };

    const eliminarProducto = (codigo: string) => {
        const productosActualizados = productos.filter((p) => p.codigo !== codigo);
        setProductos(productosActualizados);
        localStorage.setItem('productosTerminados', JSON.stringify(productosActualizados));
        resetForm();
    };

    const resetForm = () => {
        setForm({
            codigo: '',
            fechaFinalizado: '',
            codigoLote: '',
            saborGelato: '',
            heladero: '',
            litrosPorEnvase: '',
            cantidad: '',
        });
        setEditando(false);
        setError('');
    };

    // Datos relacionados para mostrar
    const loteSeleccionado = lotes.find((l) => l.codigoLote === form.codigoLote) || null;
    const heladeroNombre = loteSeleccionado
        ? heladeros.find((h) => h.codigo === loteSeleccionado.heladero)?.nombre || loteSeleccionado.heladero
        : '';
    const saborNombre = loteSeleccionado
        ? sabores.find((s) => s.codigoSabor === loteSeleccionado.saborGelato)?.nombreSabor || loteSeleccionado.saborGelato
        : '';

    return (
        <Grid container spacing={3} sx={{ padding: 3 }}>
            <Grid item xs={12}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ textAlign: 'center', fontWeight: 'bold' }}
                >
                    Reporte de Producto Terminado
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: '#00796b', fontWeight: 'bold' }}
                    >
                        {editando ? 'Modificar Producto Terminado' : 'Registrar Producto Terminado'}
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            guardarProducto();
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
                                    label="Fecha Finalizado"
                                    name="fechaFinalizado"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    value={form.fechaFinalizado}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    select
                                    label="Código de Lote"
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
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Litros por Envase"
                                    name="litrosPorEnvase"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    value={form.litrosPorEnvase}
                                    onChange={handleChange}
                                    inputProps={{ min: 0 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Cantidad"
                                    name="cantidad"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    value={form.cantidad}
                                    onChange={handleChange}
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
                                    {editando ? 'Modificar Producto Terminado' : 'Registrar Producto Terminado'}
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

            {/* Filtro por rango de fechas */}
            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: '#00796b', fontWeight: 'bold', mb: 4 }}
                    >
                        Reporte de Productos Terminados
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Fecha Inicio"
                                type="date"
                                variant="outlined"
                                fullWidth
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Fecha Fin"
                                type="date"
                                variant="outlined"
                                fullWidth
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        {productosFiltrados.length === 0 ? (
                            <Typography variant="body1" sx={{ width: '100%', mb: 6 }}>
                                No hay productos terminados registrados en el rango seleccionado.
                            </Typography>
                        ) : (
                            productosFiltrados.map((item, index) => {
                                const lote = lotes.find((l) => l.codigoLote === item.codigoLote);
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
                                                    {`Fecha Finalizado: ${getSafeString(item.fechaFinalizado)}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Código de Lote: ${getSafeString(item.codigoLote)}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Sabor Gelato: ${saborNombre}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Heladero: ${heladeroNombre}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Litros por Envase: ${getSafeString(item.litrosPorEnvase)}`}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {`Cantidad: ${getSafeString(item.cantidad)}`}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Button
                                                    color="primary"
                                                    onClick={() => cargarProducto(item)}
                                                    sx={{ marginRight: 1 }}
                                                >
                                                    Modificar
                                                </Button>
                                                <Button
                                                    color="error"
                                                    onClick={() => eliminarProducto(getSafeString(item.codigo))}
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

export default ReporteProductoTerminado;