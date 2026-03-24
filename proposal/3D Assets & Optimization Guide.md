# **3D Asset Guide: The Spirit Manifest**

This document contains asset reference sources and technical steps to prepare 3D models for use in "The Silent Architect" particle system.

## **1. Recommended Resources**

Since we need elegant yet lightweight silhouettes, look for models in the **Low-Poly** or **Sculpt** categories.

* **Poly Pizza (poly.pizza):** Search for "Wolf" or "Tiger". Usually available in very clean .glb format.  
* **Sketchfab:** Search for "White Wolf" or "Spirit Animal". Ensure the license is *Creative Commons* (CC BY).  
* **Quaternius (quaternius.com):** Provides the "Ultimate Nature Pack" which has wolf and tiger models with excellent topology for the web.

## **2. Required Asset Specifications**

To achieve sharp yet performant particle effects:

* **Format:** .glb or .gltf (Most efficient for the web).  
* **Polygon Count:** Ideally under 10,000 tris. Since we only take the *vertices*, we don't need complex texture details.  
* **Position:** Ensure the model is at the origin (0,0,0) in Blender before exporting.

## **3. Optimization Workflow (Expert Tip)**

Use the `gltf-pipeline` CLI tool to reduce file size:

```bash
npx gltf-pipeline -i model.glb -o spirit_model.glb -d
```

The `-d` option applies Draco compression, which can reduce file size by 70-90%.

## **4. Visual Concept: "The Spirit Glow"**

Do not use solid colors. Use materials with *additive blending* for the particles.

* **Color:** #E0E0E0 (Mist White) with a slight emission of #00E5FF (Mana Glow).  
* **Texture:** Use a soft blurred circle image as an *alpha map* for each particle so they don't look like rough squares.