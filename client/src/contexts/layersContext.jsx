import React from "react";
import { createContext, useState, useRef } from "react";

const LayersContext = createContext({
  layers: [],
  addLayer: () => {},
  removeLayer: (index) => {},
  updateLayerUnits: () => {},
  updateLayerActivation: () => {},
  getLayers: () => {},
  getLearningRate: () => {},
  getSettings: () => {},
  setLearningRate: () => {},
  setEpochs: () => {},
  setBatchSize: () => {},
});

export function LayersProvider({ children }) {
  const LayerCounterRef = useRef(2);
  //The default layer is currently only for classification model
  //TODO: Add more default layers for other models
  const defaultLayers = [
    {
      id: 0,
      type: "dense",
      units: 16,
      activation: "relu"
    }
  ];

  const [layers, setLayers] = useState(defaultLayers);
  const [learningRate, setLearningRate] = useState(0.2);
  const [settings, setSettings] = useState({
    epochs: 50,
    batchSize: 12,
  });

  const addLayer = (index) => {
    const newLayer = {
      id: LayerCounterRef.current,
      type: "dense",
      units: 16,
      activation: "relu"
    };
    setLayers((prevLayers) => {
      const newLayers = [...prevLayers];
      newLayers.splice(index, 0, newLayer);
      return newLayers;
    });
    LayerCounterRef.current++;
  };

  const removeLayer = (index) => {
    setLayers((prevLayers) => {
      const newLayers = [...prevLayers];
      newLayers.splice(index, 1);
      return newLayers;
    });
  };

  const updateLayerUnits = (index, units) => {
    setLayers((prevLayers) => {
      const newLayers = [...prevLayers];
      newLayers[index].units = units;
      return newLayers;
    });
  };

  const updateLayerActivation = (index, activation) => {
    setLayers((prevLayers) => {
      const newLayers = [...prevLayers];
      newLayers[index].activation = activation;
      return newLayers;
    });
  };

  const getLayers = () => {
    let nnLayers = [];
    layers.forEach((layer) => {
      nnLayers.push({
        type: layer.type,
        units: layer.units,
        activation: layer.activation
      });
    });
    nnLayers.push({
      type: "dense",
      activation: "softmax"
    });
    return nnLayers;
  }

  const getLearningRate = () => {
    return learningRate;
  }

  const getSettings = () => {
    return settings;
  }

  const setEpochs = (epochs) => {
    setSettings((prevSettings) => {
      const newSettings = {...prevSettings};
      newSettings.epochs = epochs;
      return newSettings;
    });
  }

  const setBatchSize = (batchSize) => {
    setSettings((prevSettings) => {
      const newSettings = {...prevSettings};
      newSettings.batchSize = batchSize;
      return newSettings;
    });
  }
  console.log(getSettings());
  console.log(getLearningRate());
  const context = {
    layers: layers,
    addLayer: addLayer,
    removeLayer: removeLayer,
    updateLayerUnits: updateLayerUnits,
    updateLayerActivation: updateLayerActivation,
    getLayers: getLayers,
    getLearningRate: getLearningRate,
    getSettings: getSettings,
    setLearningRate: setLearningRate,
    setEpochs: setEpochs,
    setBatchSize: setBatchSize
  };

  return <LayersContext.Provider value={context}>{children}</LayersContext.Provider>;
}

export default LayersContext;
