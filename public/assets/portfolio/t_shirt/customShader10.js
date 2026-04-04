
/***
* based on: https://github.com/BabylonJS/Babylon.js/blob/master/materialsLibrary/src/terrain/babylon.terrainMaterial.ts
***/
(function (BABYLON) {
    var CustomMaterialDefines = (function (_super) {
        __extends(CustomMaterialDefines, _super);
        function CustomMaterialDefines() {
            var _this = _super.call(this) || this;
            _this.DIFFUSE = false;
            _this.BUMP = false;
            _this.CLIPPLANE = false;
            _this.ALPHATEST = false;
            _this.DEPTHPREPASS = false;
            _this.POINTSIZE = false;
            _this.FOG = false;
            _this.SPECULARTERM = false;
            _this.NORMAL = false;
            _this.UV1 = false;
            _this.UV2 = false;
            _this.VERTEXCOLOR = false;
            _this.VERTEXALPHA = false;
            _this.NUM_BONE_INFLUENCERS = 0;
            _this.BonesPerMesh = 0;
            _this.INSTANCES = false;
            _this.rebuild();
            return _this;
        }
        return CustomMaterialDefines;
    }(BABYLON.MaterialDefines));
    var CustomMaterial = (function (_super) {
        __extends(CustomMaterial, _super);
        function CustomMaterial(name, scene) {
            var _this = _super.call(this, name, scene) || this;
            _this.diffuseColor = new BABYLON.Color3(1, 1, 1);
            _this.specularColor = new BABYLON.Color3(0, 0, 0);
            _this.specularPower = 64;
            _this._disableLighting = false;
            _this._maxSimultaneousLights = 4;
            return _this;
        }
        CustomMaterial.prototype.needAlphaBlending = function () {
            return (this.alpha < 1.0);
        };
        CustomMaterial.prototype.needAlphaTesting = function () {
            return false;
        };
        CustomMaterial.prototype.getAlphaTestTexture = function () {
            return null;
        };
        // Methods   
        CustomMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
            if (this.isFrozen) {
                if (this._wasPreviouslyReady && subMesh.effect) {
                    return true;
                }
            }
            if (!subMesh._materialDefines) {
                subMesh._materialDefines = new CustomMaterialDefines();
            }
            var defines = subMesh._materialDefines;
            var scene = this.getScene();
            if (!this.checkReadyOnEveryCall && subMesh.effect) {
                if (this._renderId === scene.getRenderId()) {
                    return true;
                }
            }
            var engine = scene.getEngine();
            // Textures
            if (scene.texturesEnabled) {
                if (this.mixTexture && BABYLON.StandardMaterial.DiffuseTextureEnabled) {
                    if (!this.mixTexture.isReady()) {
                        return false;
                    }
                    else {
                        defines._needUVs = true;
                        defines.DIFFUSE = true;
                    }
                }
                if ((this.bumpTexture1 || this.bumpTexture2 || this.bumpTexture3 || this.bumpTexture4 || this.bumpTexture5 || this.bumpTexture6) && BABYLON.StandardMaterial.BumpTextureEnabled) {
                    defines._needUVs = true;
                    defines._needNormals = true;
                    defines.BUMP = true;
                }
            }
            // Misc.
            BABYLON.MaterialHelper.PrepareDefinesForMisc(mesh, scene, false, this.pointsCloud, this.fogEnabled, defines);
            // Lights
            defines._needNormals = BABYLON.MaterialHelper.PrepareDefinesForLights(scene, mesh, defines, false, this._maxSimultaneousLights, this._disableLighting);
            // Values that need to be evaluated on every frame
            BABYLON.MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, defines, useInstances ? true : false);
            // Attribs
            BABYLON.MaterialHelper.PrepareDefinesForAttributes(mesh, defines, true, true);
            // Get correct effect      
            if (defines.isDirty) {
                defines.markAsProcessed();
                scene.resetCachedMaterial();
                // Fallbacks
                var fallbacks = new BABYLON.EffectFallbacks();
                if (defines.FOG) {
                    fallbacks.addFallback(1, "FOG");
                }
                BABYLON.MaterialHelper.HandleFallbacksForShadows(defines, fallbacks, this.maxSimultaneousLights);
                if (defines.NUM_BONE_INFLUENCERS > 0) {
                    fallbacks.addCPUSkinningFallback(0, mesh);
                }
                //Attributes
                var attribs = [BABYLON.VertexBuffer.PositionKind];
                if (defines.NORMAL) {
                    attribs.push(BABYLON.VertexBuffer.NormalKind);
                }
                if (defines.UV1) {
                    attribs.push(BABYLON.VertexBuffer.UVKind);
                }
                if (defines.UV2) {
                    attribs.push(BABYLON.VertexBuffer.UV2Kind);
                }
                if (defines.VERTEXCOLOR) {
                    attribs.push(BABYLON.VertexBuffer.ColorKind);
                }
                BABYLON.MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
                BABYLON.MaterialHelper.PrepareAttributesForInstances(attribs, defines);
                // Legacy browser patch
                var shaderName = "custom";
                var join = defines.toString();
                var uniforms = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vDiffuseColor", "vSpecularColor",
                    "vFogInfos", "vFogColor", "pointSize", "vTextureInfos", "mBones", "vClipPlane", "textureMatrix",
                    "diffuse1Infos", "diffuse2Infos", "diffuse3Infos", "diffuse4Infos", "diffuse5Infos", "diffuse6Infos"
                ];
                var samplers = ["textureSampler", "diffuse1Sampler", "diffuse2Sampler", "diffuse3Sampler", "diffuse4Sampler", "diffuse5Sampler", "diffuse6Sampler",
                    "bump1Sampler", "bump2Sampler", "bump3Sampler", "bump4Sampler", "bump5Sampler", "bump6Sampler"
                ];
                var uniformBuffers = new Array();
                BABYLON.MaterialHelper.PrepareUniformsAndSamplersList({
                    uniformsNames: uniforms,
                    uniformBuffersNames: uniformBuffers,
                    samplers: samplers,
                    defines: defines,
                    maxSimultaneousLights: this.maxSimultaneousLights
                });
                subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
                    attributes: attribs,
                    uniformsNames: uniforms,
                    uniformBuffersNames: uniformBuffers,
                    samplers: samplers,
                    defines: join,
                    fallbacks: fallbacks,
                    onCompiled: this.onCompiled,
                    onError: this.onError,
                    indexParameters: { maxSimultaneousLights: this.maxSimultaneousLights }
                }, engine), defines);
            }
            if (!subMesh.effect || !subMesh.effect.isReady()) {
                return false;
            }
            this._renderId = scene.getRenderId();
            this._wasPreviouslyReady = true;
            return true;
        };
        CustomMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
            var scene = this.getScene();
            var defines = subMesh._materialDefines;
            if (!defines) {
                return;
            }
            var effect = subMesh.effect;
            if (!effect) {
                return;
            }
            this._activeEffect = effect;
            // Matrices        
            this.bindOnlyWorldMatrix(world);
            this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix());
            // Bones
            BABYLON.MaterialHelper.BindBonesParameters(mesh, this._activeEffect);
            if (this._mustRebind(scene, effect)) {
                // Textures        
                if (this.mixTexture) { 
                    this._activeEffect.setTexture("textureSampler", this._mixTexture);
                    this._activeEffect.setFloat2("vTextureInfos", this._mixTexture.coordinatesIndex, this._mixTexture.level);
                    this._activeEffect.setMatrix("textureMatrix", this._mixTexture.getTextureMatrix());
                    if (BABYLON.StandardMaterial.DiffuseTextureEnabled) {
                        if (this._diffuseTexture1) {
                            this._activeEffect.setTexture("diffuse1Sampler", this._diffuseTexture1);
                            this._activeEffect.setFloat2("diffuse1Infos", this._diffuseTexture1.uScale, this._diffuseTexture1.vScale);
                        }
                        if (this._diffuseTexture2) {
                            this._activeEffect.setTexture("diffuse2Sampler", this._diffuseTexture2);
                            this._activeEffect.setFloat2("diffuse2Infos", this._diffuseTexture2.uScale, this._diffuseTexture2.vScale);
                        }
                        if (this._diffuseTexture3) {
                            this._activeEffect.setTexture("diffuse3Sampler", this._diffuseTexture3);
                            this._activeEffect.setFloat2("diffuse3Infos", this._diffuseTexture3.uScale, this._diffuseTexture3.vScale);
                        }
						if (this._diffuseTexture4) {
                            this._activeEffect.setTexture("diffuse4Sampler", this._diffuseTexture4);
                            this._activeEffect.setFloat2("diffuse4Infos", this._diffuseTexture4.uScale, this._diffuseTexture4.vScale);
                        }
                        if (this._diffuseTexture5) {
                            this._activeEffect.setTexture("diffuse5Sampler", this._diffuseTexture5);
                            this._activeEffect.setFloat2("diffuse5Infos", this._diffuseTexture5.uScale, this._diffuseTexture5.vScale);
                        }
                        if (this._diffuseTexture6) {
                            this._activeEffect.setTexture("diffuse6Sampler", this._diffuseTexture6);
                            this._activeEffect.setFloat2("diffuse6Infos", this._diffuseTexture6.uScale, this._diffuseTexture6.vScale);
                        }
                    }
                    if (BABYLON.StandardMaterial.BumpTextureEnabled && scene.getEngine().getCaps().standardDerivatives) {
                        if (this._bumpTexture1) {
                            this._activeEffect.setTexture("bump1Sampler", this._bumpTexture1);
                        }
                        if (this._bumpTexture2) {
                            this._activeEffect.setTexture("bump2Sampler", this._bumpTexture2);
                        }
                        if (this._bumpTexture3) {
                            this._activeEffect.setTexture("bump3Sampler", this._bumpTexture3);
                        }
						if (this._bumpTexture4) {
                            this._activeEffect.setTexture("bump4Sampler", this._bumpTexture4);
                        }
                        if (this._bumpTexture5) {
                            this._activeEffect.setTexture("bump5Sampler", this._bumpTexture5);
                        }
                        if (this._bumpTexture6) {
                            this._activeEffect.setTexture("bump6Sampler", this._bumpTexture6);
                        }
                    }
                }
                // Clip plane
                BABYLON.MaterialHelper.BindClipPlane(this._activeEffect, scene);
                // Point size
                if (this.pointsCloud) {
                    this._activeEffect.setFloat("pointSize", this.pointSize);
                }
                BABYLON.MaterialHelper.BindEyePosition(effect, scene);
            }
            this._activeEffect.setColor4("vDiffuseColor", this.diffuseColor, this.alpha * mesh.visibility);
            if (defines.SPECULARTERM) {
                this._activeEffect.setColor4("vSpecularColor", this.specularColor, this.specularPower);
            }
            if (scene.lightsEnabled && !this.disableLighting) {
                BABYLON.MaterialHelper.BindLights(scene, mesh, this._activeEffect, defines, this.maxSimultaneousLights);
            }
            // View
            if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== BABYLON.Scene.FOGMODE_NONE) {
                this._activeEffect.setMatrix("view", scene.getViewMatrix());
            }
            // Fog
            BABYLON.MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect);
            this._afterBind(mesh, this._activeEffect);
        };
        CustomMaterial.prototype.getAnimatables = function () {
            var results = [];
            if (this.mixTexture && this.mixTexture.animations && this.mixTexture.animations.length > 0) {
                results.push(this.mixTexture);
            }
            return results;
        };
        CustomMaterial.prototype.getActiveTextures = function () {
            var activeTextures = _super.prototype.getActiveTextures.call(this);
            if (this._mixTexture) {
                activeTextures.push(this._mixTexture);
            }
            if (this._diffuseTexture1) {
                activeTextures.push(this._diffuseTexture1);
            }
            if (this._diffuseTexture2) {
                activeTextures.push(this._diffuseTexture2);
            }
            if (this._diffuseTexture3) {
                activeTextures.push(this._diffuseTexture3);
            }
			if (this._diffuseTexture4) {
                activeTextures.push(this._diffuseTexture4);
            }
            if (this._diffuseTexture5) {
                activeTextures.push(this._diffuseTexture5);
            }
            if (this._diffuseTexture6) {
                activeTextures.push(this._diffuseTexture6);
            }
            if (this._bumpTexture1) {
                activeTextures.push(this._bumpTexture1);
            }
            if (this._bumpTexture2) {
                activeTextures.push(this._bumpTexture2);
            }
            if (this._bumpTexture3) {
                activeTextures.push(this._bumpTexture3);
            }
			if (this._bumpTexture4) {
                activeTextures.push(this._bumpTexture4);
            }
            if (this._bumpTexture5) {
                activeTextures.push(this._bumpTexture5);
            }
            if (this._bumpTexture6) {
                activeTextures.push(this._bumpTexture6);
            }
            return activeTextures;
        };
        CustomMaterial.prototype.hasTexture = function (texture) {
            if (_super.prototype.hasTexture.call(this, texture)) {
                return true;
            }
            if (this._mixTexture === texture) {
                return true;
            }
            if (this._diffuseTexture1 === texture) {
                return true;
            }
            if (this._diffuseTexture2 === texture) {
                return true;
            }
            if (this._diffuseTexture3 === texture) {
                return true;
            }
			if (this._diffuseTexture4 === texture) {
                return true;
            }
            if (this._diffuseTexture5 === texture) {
                return true;
            }
            if (this._diffuseTexture6 === texture) {
                return true;
            }
            if (this._bumpTexture1 === texture) {
                return true;
            }
            if (this._bumpTexture2 === texture) {
                return true;
            }
            if (this._bumpTexture3 === texture) {
                return true;
            }
			if (this._bumpTexture4 === texture) {
                return true;
            }
            if (this._bumpTexture5 === texture) {
                return true;
            }
            if (this._bumpTexture6 === texture) {
                return true;
            }
            return false;
        };
        CustomMaterial.prototype.dispose = function (forceDisposeEffect) {
            if (this.mixTexture) {
                this.mixTexture.dispose();
            }
            _super.prototype.dispose.call(this, forceDisposeEffect);
        };
        CustomMaterial.prototype.clone = function (name) {
            var _this = this;
            return BABYLON.SerializationHelper.Clone(function () { return new CustomMaterial(name, _this.getScene()); }, this);
        };
        CustomMaterial.prototype.serialize = function () {
            var serializationObject = BABYLON.SerializationHelper.Serialize(this);
            serializationObject.customType = "BABYLON.CustomMaterial";
            return serializationObject;
        };
        CustomMaterial.prototype.getClassName = function () {
            return "CustomMaterial";
        };
        // Statics
        CustomMaterial.Parse = function (source, scene, rootUrl) {
            return BABYLON.SerializationHelper.Parse(function () { return new CustomMaterial(source.name, scene); }, source, scene, rootUrl);
        };
        __decorate([
            BABYLON.serializeAsTexture("mixTexture")
        ], CustomMaterial.prototype, "_mixTexture", void 0);
        __decorate([
            BABYLON.expandToProperty("_markAllSubMeshesAsTexturesDirty")
        ], CustomMaterial.prototype, "mixTexture", void 0);
        __decorate([
            BABYLON.serializeAsTexture("diffuseTexture1")
        ], CustomMaterial.prototype, "_diffuseTexture1", void 0);
        __decorate([
            BABYLON.expandToProperty("_markAllSubMeshesAsTexturesDirty")
        ], CustomMaterial.prototype, "diffuseTexture1", void 0);
        __decorate([
            BABYLON.serializeAsTexture("diffuseTexture2")
        ], CustomMaterial.prototype, "_diffuseTexture2", void 0);
        __decorate([
            BABYLON.expandToProperty("_markAllSubMeshesAsTexturesDirty")
        ], CustomMaterial.prototype, "diffuseTexture2", void 0);
        __decorate([
            BABYLON.serializeAsTexture("diffuseTexture3")
        ], CustomMaterial.prototype, "_diffuseTexture3", void 0);
        __decorate([
            BABYLON.expandToProperty("_markAllSubMeshesAsTexturesDirty")
        ], CustomMaterial.prototype, "diffuseTexture3", void 0);
		__decorate([
            BABYLON.serializeAsTexture("diffuseTexture4")
        ], CustomMaterial.prototype, "_diffuseTexture4", void 0);
        __decorate([
            BABYLON.expandToProperty("_markAllSubMeshesAsTexturesDirty")
        ], CustomMaterial.prototype, "diffuseTexture4", void 0);
        __decorate([
            BABYLON.serializeAsTexture("diffuseTexture5")
        ], CustomMaterial.prototype, "_diffuseTexture5", void 0);
        __decorate([
            BABYLON.expandToProperty("_markAllSubMeshesAsTexturesDirty")
        ], CustomMaterial.prototype, "diffuseTexture5", void 0);
        __decorate([
            BABYLON.serializeAsTexture("diffuseTexture6")
        ], CustomMaterial.prototype, "_diffuseTexture6", void 0);
        __decorate([
            BABYLON.expandToProperty("_markAllSubMeshesAsTexturesDirty")
        ], CustomMaterial.prototype, "diffuseTexture6", void 0);
        __decorate([
            BABYLON.serializeAsTexture("bumpTexture1")
        ], CustomMaterial.prototype, "_bumpTexture1", void 0);
        __decorate([
            BABYLON.expandToProperty("_markAllSubMeshesAsTexturesDirty")
        ], CustomMaterial.prototype, "bumpTexture1", void 0);
        __decorate([
            BABYLON.serializeAsTexture("bumpTexture2")
        ], CustomMaterial.prototype, "_bumpTexture2", void 0);
        __decorate([
            BABYLON.expandToProperty("_markAllSubMeshesAsTexturesDirty")
        ], CustomMaterial.prototype, "bumpTexture2", void 0);
        __decorate([
            BABYLON.serializeAsTexture("bumpTexture3")
        ], CustomMaterial.prototype, "_bumpTexture3", void 0);
        __decorate([
            BABYLON.expandToProperty("_markAllSubMeshesAsTexturesDirty")
        ], CustomMaterial.prototype, "bumpTexture3", void 0);
		__decorate([
            BABYLON.serializeAsTexture("bumpTexture4")
        ], CustomMaterial.prototype, "_bumpTexture4", void 0);
        __decorate([
            BABYLON.expandToProperty("_markAllSubMeshesAsTexturesDirty")
        ], CustomMaterial.prototype, "bumpTexture4", void 0);
        __decorate([
            BABYLON.serializeAsTexture("bumpTexture5")
        ], CustomMaterial.prototype, "_bumpTexture5", void 0);
        __decorate([
            BABYLON.expandToProperty("_markAllSubMeshesAsTexturesDirty")
        ], CustomMaterial.prototype, "bumpTexture5", void 0);
        __decorate([
            BABYLON.serializeAsTexture("bumpTexture6")
        ], CustomMaterial.prototype, "_bumpTexture6", void 0);
        __decorate([
            BABYLON.expandToProperty("_markAllSubMeshesAsTexturesDirty")
        ], CustomMaterial.prototype, "bumpTexture6", void 0);
        __decorate([
            BABYLON.serializeAsColor3()
        ], CustomMaterial.prototype, "diffuseColor", void 0);
        __decorate([
            BABYLON.serializeAsColor3()
        ], CustomMaterial.prototype, "specularColor", void 0);
        __decorate([
            BABYLON.serialize()
        ], CustomMaterial.prototype, "specularPower", void 0);
        __decorate([
            BABYLON.serialize("disableLighting")
        ], CustomMaterial.prototype, "_disableLighting", void 0);
        __decorate([
            BABYLON.expandToProperty("_markAllSubMeshesAsLightsDirty")
        ], CustomMaterial.prototype, "disableLighting", void 0);
        __decorate([
            BABYLON.serialize("maxSimultaneousLights")
        ], CustomMaterial.prototype, "_maxSimultaneousLights", void 0);
        __decorate([
            BABYLON.expandToProperty("_markAllSubMeshesAsLightsDirty")
        ], CustomMaterial.prototype, "maxSimultaneousLights", void 0);
        return CustomMaterial;
    }(BABYLON.PushMaterial));
    BABYLON.CustomMaterial = CustomMaterial;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.CustomMaterial.js.map
 
BABYLON.Effect.ShadersStore['customVertexShader'] = "precision highp float;\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n\n#include<instancesDeclaration>\nuniform mat4 view;\nuniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vTextureUV;\nuniform mat4 textureMatrix;\nuniform vec2 vTextureInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void) {\n#include<instancesVertex>\n#include<bonesVertex>\ngl_Position=viewProjection*finalWorld*vec4(position,1.0);\nvec4 worldPos=finalWorld*vec4(position,1.0);\nvPositionW=vec3(worldPos);\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef DIFFUSE\nif (vTextureInfos.x == 0.)\n{\nvTextureUV=vec2(textureMatrix*vec4(uv,1.0,0.0));\n}\nelse\n{\nvTextureUV=vec2(textureMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n\n#ifdef CLIPPLANE\nfClipDistance=dot(worldPos,vClipPlane);\n#endif\n\n#include<fogVertex>\n\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n\n#ifdef POINTSIZE\ngl_PointSize=pointSize;\n#endif\n}\n";
BABYLON.Effect.ShadersStore['customPixelShader'] = "precision highp float;\n\nuniform vec3 vEyePosition;\nuniform vec4 vDiffuseColor;\n#ifdef SPECULARTERM\nuniform vec4 vSpecularColor;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n\n#ifdef DIFFUSE\nvarying vec2 vTextureUV;\nuniform sampler2D textureSampler;\nuniform vec2 vTextureInfos;\nuniform sampler2D diffuse1Sampler;\nuniform sampler2D diffuse2Sampler;\nuniform sampler2D diffuse3Sampler;\nuniform sampler2D diffuse4Sampler;\nuniform sampler2D diffuse5Sampler;\nuniform sampler2D diffuse6Sampler;\nuniform vec2 diffuse1Infos;\nuniform vec2 diffuse2Infos;\nuniform vec2 diffuse3Infos;\nuniform vec2 diffuse4Infos;\nuniform vec2 diffuse5Infos;\nuniform vec2 diffuse6Infos;\n#endif\n#ifdef BUMP\nuniform sampler2D bump1Sampler;\nuniform sampler2D bump2Sampler;\nuniform sampler2D bump3Sampler;\nuniform sampler2D bump4Sampler;\nuniform sampler2D bump5Sampler;\nuniform sampler2D bump6Sampler;\n#endif\n\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#include<clipPlaneFragmentDeclaration>\n\n#include<fogFragmentDeclaration>\n\n#ifdef BUMP\n#extension GL_OES_standard_derivatives : enable\n\nmat3 cotangent_frame(vec3 normal,vec3 p,vec2 uv)\n{\n\nvec3 dp1=dFdx(p);\nvec3 dp2=dFdy(p);\nvec2 duv1=dFdx(uv);\nvec2 duv2=dFdy(uv);\n\nvec3 dp2perp=cross(dp2,normal);\nvec3 dp1perp=cross(normal,dp1);\nvec3 tangent=dp2perp*duv1.x+dp1perp*duv2.x;\nvec3 binormal=dp2perp*duv1.y+dp1perp*duv2.y;\n\nfloat invmax=inversesqrt(max(dot(tangent,tangent),dot(binormal,binormal)));\nreturn mat3(tangent*invmax,binormal*invmax,normal);\n}\nvec3 perturbNormal(vec3 viewDir,vec3 mixColor)\n{ \nvec3 bump1Color=texture2D(bump1Sampler,vTextureUV*diffuse1Infos).xyz;\nvec3 bump2Color=texture2D(bump2Sampler,vTextureUV*diffuse2Infos).xyz;\nvec3 bump3Color=texture2D(bump3Sampler,vTextureUV*diffuse3Infos).xyz;\nvec3 bump4Color=texture2D(bump4Sampler,vTextureUV*diffuse4Infos).xyz;\nvec3 bump5Color=texture2D(bump5Sampler,vTextureUV*diffuse5Infos).xyz;\nvec3 bump6Color=texture2D(bump6Sampler,vTextureUV*diffuse6Infos).xyz;\nbump1Color.rgb*=mixColor.r;\nbump2Color.rgb=mix(bump1Color.rgb,bump2Color.rgb,mixColor.g);\nbump3Color.rgb=mix(bump2Color.rgb,bump3Color.rgb,mixColor.b);\nbump4Color.rgb=mix(bump3Color.rgb,bump4Color.rgb,(mixColor.b*mixColor.g));\nbump5Color.rgb=mix(bump4Color.rgb,bump5Color.rgb,(mixColor.b*mixColor.r));\nvec3 map=mix(bump5Color.rgb,bump6Color.rgb,(mixColor.r*mixColor.g));\nmap=map*255./127.-128./127.;\nmat3 TBN=cotangent_frame(vNormalW*vTextureInfos.y,-viewDir,vTextureUV);\nreturn normalize(TBN*map);\n}\n#endif\nvoid main(void) {\n\n#ifdef CLIPPLANE\nif (fClipDistance>0.0)\ndiscard;\n#endif\nvec3 viewDirectionW=normalize(vEyePosition-vPositionW);\n\nvec4 baseColor=vec4(1.,1.,1.,1.);\nvec3 diffuseColor=vDiffuseColor.rgb;\n#ifdef SPECULARTERM\nfloat glossiness=vSpecularColor.a;\nvec3 specularColor=vSpecularColor.rgb;\n#else\nfloat glossiness=0.;\n#endif\n\nfloat alpha=vDiffuseColor.a;\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n#ifdef DIFFUSE\nbaseColor=texture2D(textureSampler,vTextureUV);\n#if defined(BUMP) && defined(DIFFUSE)\nnormalW=perturbNormal(viewDirectionW,baseColor.rgb);\n#endif\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\nbaseColor.rgb*=vTextureInfos.y;\nvec4 diffuse1Color=texture2D(diffuse1Sampler,vTextureUV*diffuse1Infos);\nvec4 diffuse2Color=texture2D(diffuse2Sampler,vTextureUV*diffuse2Infos);\nvec4 diffuse3Color=texture2D(diffuse3Sampler,vTextureUV*diffuse3Infos);\nvec4 diffuse4Color=texture2D(diffuse4Sampler,vTextureUV*diffuse4Infos);\nvec4 diffuse5Color=texture2D(diffuse5Sampler,vTextureUV*diffuse5Infos);\nvec4 diffuse6Color=texture2D(diffuse6Sampler,vTextureUV*diffuse6Infos);\ndiffuse1Color.rgb*=baseColor.r;\ndiffuse2Color.rgb=mix(diffuse1Color.rgb,diffuse2Color.rgb,baseColor.g);\ndiffuse3Color.rgb=mix(diffuse2Color.rgb,diffuse3Color.rgb,baseColor.b);\ndiffuse4Color.rgb=mix(diffuse3Color.rgb,diffuse4Color.rgb,(baseColor.b*baseColor.g));\ndiffuse5Color.rgb=mix(diffuse4Color.rgb,diffuse5Color.rgb,(baseColor.b*baseColor.r));\nbaseColor.rgb=mix(diffuse5Color.rgb,diffuse6Color.rgb,(baseColor.r*baseColor.g));\nif(baseColor.rgb == vec3(0.0,0.0,0.0)) discard;\n#endif\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n\nvec3 diffuseBase=vec3(0.,0.,0.);\nlightingInfo info;\nfloat shadow=1.;\n#ifdef SPECULARTERM\nvec3 specularBase=vec3(0.,0.,0.);\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n#ifdef SPECULARTERM\nvec3 finalSpecular=specularBase*specularColor;\n#else\nvec3 finalSpecular=vec3(0.0);\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor*baseColor.rgb,0.0,1.0);\n\nvec4 color=vec4(finalDiffuse+finalSpecular,alpha);\n#include<fogFragment>\ngl_FragColor=color;\n}\n";