import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, Alert } from '@mui/material';

interface Producto {
    codigo: string;
    nombre: string;
    peso: string;
}

interface Lote {
    codigoLote: string;
    heladero: string; // código del heladero
    saborGelato: string; // código del sabor
}

interface Heladero {
    codigo: string;
    nombre: string;
}

interface Sabor {
    codigoSabor: string;
    nombreSabor: string;
}

interface Pesado {
    codigoPesado: string;
    codigoLote: string;
    fecha: string;
    productos: Producto[];
}

const PesadoPage = () => {
    const [codigoPesado, setCodigoPesado] = useState('');
    const [codigoLote, setCodigoLote] = useState('');
    const [fecha, setFecha] = useState('');
    const [productos, setProductos] = useState<Producto[]>([]);
    const [pesados, setPesados] = useState<Pesado[]>([]);
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [heladeros, setHeladeros] = useState<Heladero[]>([]);
    const [sabores, setSabores] = useState<Sabor[]>([]);
    const [loteSeleccionado, setLoteSeleccionado] = useState<Lote | null>(null);
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState('');

    // Simulación de productos a pesar (puedes cargar esto de localStorage si lo tienes)
    const productosDisponibles = [
        { codigo: 'P1', nombre: 'Leche' },
        { codigo: 'P2', nombre: 'Azúcar' },
        { codigo: 'P3', nombre: 'Cacao' },
    ];

    useEffect(() => {
        const pesadosData = JSON.parse(localStorage.getItem('pesados') || '[]');
        setPesados(pesadosData);

        const lotesData = JSON.parse(localStorage.getItem('lotes') || '[]');
        setLotes(lotesData);

        const heladerosData = JSON.parse(localStorage.getItem('heladeros') || '[]');
        setHeladeros(heladerosData);

        const saboresData = JSON.parse(localStorage.getItem('sabores') || '[]');
        setSabores(saboresData);
    }, []);

    // Buscar lote y mostrar info
    const buscarLote = () => {
        setError('');
        const lote = lotes.find(l => l.codigoLote === codigoLote);
        if (!lote) {
            setLoteSeleccionado(null);
            setProductos([]);
            setError('No existe el lote. Regístrelo primero.');
            return;
        }
        setLoteSeleccionado(lote);
        setProductos(productosDisponibles.map(p => ({ ...p, peso: '' })));
    };

    // Guardar o modificar pesado
    const guardarPesado = () => {
        setError('');
        if (!codigoPesado || !codigoLote || !fecha || productos.some(p => !p.peso)) {
            setError('Completa todos los campos y los pesos.');
            return;
        }

        if (editando) {
            const pesadosActualizados = pesados.map(p =>
                p.codigoPesado === codigoPesado
                    ? { codigoPesado, codigoLote, fecha, productos }
                    : p
            );
            setPesados(pesadosActualizados);
            localStorage.setItem('pesados', JSON.stringify(pesadosActualizados));
            resetForm();
            return;
        }

        if (pesados.some(p => p.codigoPesado === codigoPesado)) {
            setError('No se pueden registrar dos pesados con el mismo código.');
            return;
        }

        const nuevoPesado = { codigoPesado, codigoLote, fecha, productos };
        const pesadosActualizados = [...pesados, nuevoPesado];
        setPesados(pesadosActualizados);
        localStorage.setItem('pesados', JSON.stringify(pesadosActualizados));
        resetForm();
    };

    // Cargar pesado para modificar
    const cargarPesado = (pesado: Pesado) => {
        setCodigoPesado(pesado.codigoPesado);
        setCodigoLote(pesado.codigoLote);
        setFecha(pesado.fecha);
        setProductos(pesado.productos);
        setLoteSeleccionado(lotes.find(l => l.codigoLote === pesado.codigoLote) || null);
        setEditando(true);
        setError('');
    };

    // Eliminar pesado
    const eliminarPesado = (codigo: string) => {
        const pesadosActualizados = pesados.filter(p => p.codigoPesado !== codigo);
        setPesados(pesadosActualizados);
        localStorage.setItem('pesados', JSON.stringify(pesadosActualizados));
        resetForm();
    };

    // Limpiar formulario
    const resetForm = () => {
        setCodigoPesado('');
        setCodigoLote('');
        setFecha('');
        setProductos([]);
        setLoteSeleccionado(null);
        setEditando(false);
        setError('');
    };

    // Cambiar peso de producto
    const cambiarPeso = (codigo: string, peso: string) => {
        setProductos(productos.map(p => p.codigo === codigo ? { ...p, peso } : p));
    };

    // Obtener nombre del heladero y sabor para mostrar
    const heladeroNombre = loteSeleccionado
        ? heladeros.find(h => h.codigo === loteSeleccionado.heladero)?.nombre || loteSeleccionado.heladero
        : '';
    const saborNombre = loteSeleccionado
        ? sabores.find(s => s.codigoSabor === loteSeleccionado.saborGelato)?.nombreSabor || loteSeleccionado.saborGelato
        : '';

    return (
        <Grid container spacing={3} sx={{ padding: 3 }}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Gestionar Pesado
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#00796b', fontWeight: 'bold' }}>
                        {editando ? 'Modificar Pesado' : 'Registrar Pesado'}
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <form onSubmit={e => { e.preventDefault(); guardarPesado(); }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Código del Pesado"
                                    variant="outlined"
                                    fullWidth
                                    value={codigoPesado}
                                    onChange={e => setCodigoPesado(e.target.value)}
                                    disabled={editando}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Código del Lote"
                                    variant="outlined"
                                    fullWidth
                                    value={codigoLote}
                                    onChange={e => setCodigoLote(e.target.value)}
                                    onBlur={buscarLote}
                                    disabled={editando}
                                />
                            </Grid>
                            {loteSeleccionado && (
                                <>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1"><b>Heladero:</b> {heladeroNombre}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1"><b>Sabor:</b> {saborNombre}</Typography>
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Fecha de Pesado"
                                    variant="outlined"
                                    type="date"
                                    fullWidth
                                    value={fecha}
                                    onChange={e => setFecha(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            {/* Productos a pesar */}
                            {productos.length > 0 && (
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Productos a pesar:</Typography>
                                    <Grid container spacing={2}>
                                        {productos.map((prod, idx) => (
                                            <Grid item xs={12} md={6} key={prod.codigo}>
                                                <TextField
                                                    label={`Peso de ${prod.nombre}`}
                                                    variant="outlined"
                                                    type="number"
                                                    fullWidth
                                                    value={prod.peso}
                                                    onChange={e => cambiarPeso(prod.codigo, e.target.value)}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            )}
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
                                    {editando ? 'Modificar Pesado' : 'Registrar Pesado'}
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

            {/* Mostrar pesados guardados */}
            <Grid item xs={12}>
                <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#00796b', fontWeight: 'bold' }}>
                        Pesados Registrados
                    </Typography>
                    <Grid container spacing={2}>
                        {pesados.length === 0 ? (
                            <Typography variant="body1" sx={{ width: '100%' }}>
                                No hay pesados registrados.
                            </Typography>
                        ) : (
                            pesados.map((item, index) => {
                                // Buscar lote, heladero y sabor para mostrar
                                const lote = lotes.find(l => l.codigoLote === item.codigoLote);
                                const heladeroNombre = lote
                                    ? heladeros.find(h => h.codigo === lote.heladero)?.nombre || lote.heladero
                                    : '';
                                const saborNombre = lote
                                    ? sabores.find(s => s.codigoSabor === lote.saborGelato)?.nombreSabor || lote.saborGelato
                                    : '';
                                return (
                                    <Grid item xs={12} key={index}>
                                        <Paper sx={{ padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div>
                                                <Typography variant="body1">{`Código de Pesado: ${item.codigoPesado}`}</Typography>
                                                <Typography variant="body1">{`Código de Lote: ${item.codigoLote}`}</Typography>
                                                <Typography variant="body1">{`Heladero: ${heladeroNombre}`}</Typography>
                                                <Typography variant="body1">{`Sabor: ${saborNombre}`}</Typography>
                                                <Typography variant="body1">{`Fecha: ${item.fecha}`}</Typography>
                                                {item.productos.map((prod, idx) => (
                                                    <Typography key={idx} variant="body2">
                                                        {`${prod.nombre}: ${prod.peso} ${prod.nombre.toLowerCase() === 'leche' ? 'litros' : 'kg'}`}
                                                    </Typography>
                                                ))}
                                            </div>
                                            <div>
                                                <Button
                                                    color="primary"
                                                    onClick={() => cargarPesado(item)}
                                                    sx={{ marginRight: 1 }}
                                                >
                                                    Modificar
                                                </Button>
                                                <Button
                                                    color="error"
                                                    onClick={() => eliminarPesado(item.codigoPesado)}
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

export default PesadoPage;