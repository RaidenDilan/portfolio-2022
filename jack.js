//////////////////////////////////////////////////////////////////////
// Pano2VR 4.5.2/10708 HTML5/CSS3 & WebGL Panorama Player           //
// License:                                                         //
// (c) 2015, Garden Gnome Software, http://ggnome.com               //
//////////////////////////////////////////////////////////////////////

var l = !0,
    o = null,
    r = !1;

function P(h, q, p, G, B) {
    var m = this;
    m.x = h;
    m.y = q;
    m.e = p;
    m.H = G;
    m.n = B;
    m.q = function(h, p, q) {
        m.x = h;
        m.y = p;
        m.e = q;
        m.H = void 0;
        m.n = void 0
    };
    m.toString = function() {
        return "(" + m.x + "," + m.y + "," + m.e + ") - (" + m.H + "," + m.n + ")"
    };
    m.k = function(h) {
        var p = Math.sin(h),
            h = Math.cos(h),
            q = m.y,
            B = m.e;
        m.y = h * q - p * B;
        m.e = p * q + h * B
    };
    m.l = function(h) {
        var p = Math.sin(h),
            h = Math.cos(h),
            q = m.x,
            B = m.e;
        m.x = h * q + p * B;
        m.e = -p * q + h * B
    };
    m.ga = function(h) {
        var p = Math.sin(h),
            h = Math.cos(h),
            q = m.x,
            B = m.y;
        m.x = h * q - p * B;
        m.y = p * q + h * B
    };
    m.La = function() {
        return new P(m.x, m.y, m.e, m.H,
            m.n)
    };
    m.length = function() {
        return Math.sqrt(m.x * m.x + m.y * m.y + m.e * m.e)
    };
    m.wa = function(h) {
        return m.x * h.x + m.y * h.y + m.e * h.e
    };
    m.Oa = function(h, p) {
        var q;
        q = Math.cos(p * Math.PI / 180);
        m.x = q * Math.sin(h * Math.PI / 180);
        m.y = Math.sin(p * Math.PI / 180);
        m.e = q * Math.cos(h * Math.PI / 180)
    };
    m.bb = function(h, p, q) {
        m.x = h.x * q + p.x * (1 - q);
        m.y = h.y * q + p.y * (1 - q);
        m.e = h.e * q + p.e * (1 - q);
        m.H = h.H * q + p.H * (1 - q);
        m.n = h.n * q + p.n * (1 - q)
    }
}
glMatrixArrayType = "undefined" != typeof Float32Array ? Float32Array : "undefined" != typeof WebGLFloatArray ? WebGLFloatArray : Array;

function Ba(h) {
    h[0] = 1;
    h[1] = 0;
    h[2] = 0;
    h[3] = 0;
    h[4] = 0;
    h[5] = 1;
    h[6] = 0;
    h[7] = 0;
    h[8] = 0;
    h[9] = 0;
    h[10] = 1;
    h[11] = 0;
    h[12] = 0;
    h[13] = 0;
    h[14] = 0;
    h[15] = 1
}

function Gb(h, q, p) {
    var G, B = p[0],
        m = p[1],
        p = p[2],
        X = Math.sqrt(B * B + m * m + p * p);
    if (X) {
        1 != X && (X = 1 / X, B *= X, m *= X, p *= X);
        var ua = Math.sin(q),
            Ua = Math.cos(q),
            ma = 1 - Ua,
            q = h[0],
            X = h[1],
            qb = h[2],
            Va = h[3],
            Ca = h[4],
            Wa = h[5],
            fa = h[6],
            Xa = h[7],
            Da = h[8],
            Ya = h[9],
            Za = h[10],
            $a = h[11],
            Ma = B * B * ma + Ua,
            ab = m * B * ma + p * ua,
            bb = p * B * ma - m * ua,
            Na = B * m * ma - p * ua,
            cb = m * m * ma + Ua,
            db = p * m * ma + B * ua,
            eb = B * p * ma + m * ua,
            B = m * p * ma - B * ua,
            m = p * p * ma + Ua;
        G ? h != G && (G[12] = h[12], G[13] = h[13], G[14] = h[14], G[15] = h[15]) : G = h;
        G[0] = q * Ma + Ca * ab + Da * bb;
        G[1] = X * Ma + Wa * ab + Ya * bb;
        G[2] = qb * Ma + fa * ab + Za * bb;
        G[3] =
            Va * Ma + Xa * ab + $a * bb;
        G[4] = q * Na + Ca * cb + Da * db;
        G[5] = X * Na + Wa * cb + Ya * db;
        G[6] = qb * Na + fa * cb + Za * db;
        G[7] = Va * Na + Xa * cb + $a * db;
        G[8] = q * eb + Ca * B + Da * m;
        G[9] = X * eb + Wa * B + Ya * m;
        G[10] = qb * eb + fa * B + Za * m;
        G[11] = Va * eb + Xa * B + $a * m
    }
}

function Yb(h, q, p) {
    var h = 0.1 * Math.tan(h * Math.PI / 360),
        q = h * q,
        G = -q,
        B = -h;
    p || (p = new glMatrixArrayType(16));
    var m = q - G,
        X = h - B;
    p[0] = 0.2 / m;
    p[1] = 0;
    p[2] = 0;
    p[3] = 0;
    p[4] = 0;
    p[5] = 0.2 / X;
    p[6] = 0;
    p[7] = 0;
    p[8] = (q + G) / m;
    p[9] = (h + B) / X;
    p[10] = -100.1 / 99.9;
    p[11] = -1;
    p[12] = 0;
    p[13] = 0;
    p[14] = -20 / 99.9;
    p[15] = 0
}

function Kc() {
    var h = "perspective",
        q = ["Webkit", "Moz", "O", "ms", "Ms"],
        p;
    p = r;
    for (p = 0; p < q.length; p++) "undefined" !== typeof document.documentElement.style[q[p] + "Perspective"] && (h = q[p] + "Perspective");
    "undefined" !== typeof document.documentElement.style[h] ? "webkitPerspective" in document.documentElement.style ? (h = document.createElement("style"), q = document.createElement("div"), p = document.head || document.getElementsByTagName("head")[0], h.textContent = "@media (-webkit-transform-3d) {#ggswhtml5{height:5px}}", p.appendChild(h),
        q.id = "ggswhtml5", document.documentElement.appendChild(q), p = 5 === q.offsetHeight, h.parentNode.removeChild(h), q.parentNode.removeChild(q)) : p = l : p = r;
    return p
}

function Lc() {
    var h;
    if (h = !!window.WebGLRenderingContext) try {
        var q = document.createElement("canvas");
        q.width = 100;
        q.height = 100;
        var p = q.getContext("webgl");
        p || (p = q.getContext("experimental-webgl"));
        h = p ? l : r
    } catch (G) {
        h = r
    }
    return h
}

function pano2vrPlayer(h) {
    function q(a) {
        var d, c;
        c = [];
        d = a.getAttributeNode("title");
        c.title = d ? d.nodeValue.toString() : "";
        d = a.getAttributeNode("description");
        c.description = d ? d.nodeValue.toString() : "";
        d = a.getAttributeNode("author");
        c.author = d ? d.nodeValue.toString() : "";
        d = a.getAttributeNode("datetime");
        c.datetime = d ? d.nodeValue.toString() : "";
        d = a.getAttributeNode("copyright");
        c.copyright = d ? d.nodeValue.toString() : "";
        d = a.getAttributeNode("source");
        c.source = d ? d.nodeValue.toString() : "";
        d = a.getAttributeNode("info");
        c.information = d ? d.nodeValue.toString() : "";
        d = a.getAttributeNode("comment");
        c.comment = d ? d.nodeValue.toString() : "";
        d = a.getAttributeNode("latitude");
        c.latitude = d ? 1 * d.nodeValue : "0.0";
        d = a.getAttributeNode("longitude");
        c.longitude = d ? 1 * d.nodeValue : "0.0";
        if (d = a.getAttributeNode("tags")) {
            a = d.nodeValue.toString().split("|");
            for (d = 0; d < a.length; d++) "" == a[d] && (a.splice(d, 1), d--);
            c.tags = a
        } else c.tags = [];
        return c
    }

    function p(a) {
        Hb = "{" == a.charAt(0) ? a.substr(1, a.length - 2) : "";
        b.skinObj && b.skinObj.changeActiveNode && b.skinObj.changeActiveNode(a)
    }

    function G(a) {
        return function() {
            b.dirty = l;
            b.Na = l;
            a.d && (a.a && a.a.complete ? (a.loaded = l, a.d.drawImage(a.a, 0, 0, a.width, a.height), a.a = o, a.A = o) : a.A && a.A.complete && !a.loaded && (a.d.drawImage(a.A, 0, 0, a.width, a.height), a.A = o))
        }
    }

    function B(a) {
        for (var d = 0; d < C.length; d++)
            if (C[d].id == a) return C[d];
        for (d = 0; d < x.length; d++)
            if (x[d].id == a) return x[d];
        for (d = 0; d < ea.length; d++)
            if (ea[d].id == a) return ea[d];
        return o
    }

    function m(a) {
        try {
            a.obj = document.createElement("img");
            a.obj.setAttribute("style", "-webkit-user-drag:none; max-width:none;");
            a.obj.setAttribute("class", "ggmedia");
            b.W && a.obj.setAttribute("id", b.W + a.id);
            a.obj.ondragstart = function() {
                return r
            };
            if (1 == a.u || 4 == a.u) a.o = function() {
                a.V(!a.v)
            }, a.da = function() {
                a.oa = r;
                a.obj.style[va] = "none"
            }, a.V = function(c) {
                a.v = c;
                a.obj.style.zIndex = a.v ? 8E4 : 0;
                a.obj.style[va] = "all 1s ease 0s";
                a.oa = l;
                Zb()
            }, a.obj.addEventListener(ua(), a.da, r), a.obj.addEventListener("transitionend", a.da, r);
            a.obj.setAttribute("src", na(a.url));
            a.z && (a.obj.width = a.z);
            a.C && (a.obj.height = a.C);
            ea.push(a);
            a.obj.style.position =
                "absolute";
            a.o && (a.obj.onclick = a.o);
            s.appendChild(a.obj)
        } catch (d) {}
    }

    function X(a) {
        try {
            a.obj = document.createElement("video");
            a.obj.setAttribute("class", "ggmedia");
            b.W && a.obj.setAttribute("id", b.W + a.id);
            a.obj.setAttribute("style", "max-width:none;");
            if (1 == a.u || 4 == a.u) a.o = function() {
                a.V(!a.v)
            }, a.da = function() {
                a.oa = r;
                a.obj.style[va] = "none"
            }, a.V = function(c) {
                a.v = c;
                a.v ? (a.obj.style.zIndex = 8E4, a.obj.style[va] = "all 1s ease 0s", b.playSound(a.id)) : (a.obj.style.zIndex = 0, a.obj.style[va] = "all 1s ease 0s");
                a.oa =
                    l;
                Zb()
            }, a.obj.addEventListener(ua(), a.da, r), a.obj.addEventListener("transitionend", a.da, r);
            2 == a.u && (a.o = function() {
                b.playPauseSound(a.id)
            }, a.V = function(c) {
                c ? b.playSound(a.id) : b.pauseSound(a.id)
            });
            var d;
            for (d = 0; d < a.url.length; d++) {
                var c;
                c = document.createElement("source");
                c.setAttribute("src", na(a.url[d]));
                a.obj.appendChild(c)
            }
            "" != a.poster && (a.obj.poster = na(a.poster), 0 > a.loop && (a.obj.jb = "none"));
            a.obj.volume = a.i * Y;
            0 == a.loop && (a.obj.r = 1E7);
            1 <= a.loop && (a.obj.r = a.loop - 1);
            if ((1 == a.mode || 2 == a.mode || 3 == a.mode ||
                    5 == a.mode) && 0 <= a.loop) a.obj.autoplay = l;
            x.push(a);
            a.obj.style.position = "absolute";
            a.z && (a.obj.width = a.z);
            a.C && (a.obj.height = a.C);
            s.appendChild(a.obj);
            a.o && (a.obj.onclick = a.o);
            a.Ra = l;
            a.obj.addEventListener("ended", function() {
                if (0 < this.r) return this.r--, this.currentTime = 0, this.play(), l;
                this.Ra = r
            }, r)
        } catch (f) {}
    }

    function ua() {
        var a, d = document.createElement("fakeelement"),
            c = {
                OTransition: "oTransitionEnd",
                MSTransition: "msTransitionEnd",
                MozTransition: "transitionend",
                WebkitTransition: "webkitTransitionEnd",
                transition: "transitionEnd"
            };
        for (a in c)
            if (void 0 !== d.style[a]) return c[a]
    }

    function Ua(a) {
        var d = -1;
        try {
            for (var c = 0; c < C.length; c++) C[c].id == a.id && C[c].obj != o && C[c].url.join() == a.url.join() && C[c].loop == a.loop && C[c].mode == a.mode && (d = c);
            if (-1 == d) {
                for (c = 0; c < C.length; c++)
                    if (C[c].id == a.id && C[c].obj != o) {
                        try {
                            C[c].obj.pause()
                        } catch (f) {}
                        try {
                            C[c].obj.parentElement.removeChild(C[c].obj), delete C[c].obj, C[c].obj = o
                        } catch (e) {}
                        d = c
                    }
                a.obj = document.createElement("audio");
                a.obj.setAttribute("class", "ggmedia");
                b.W && a.obj.setAttribute("id",
                    b.W + a.id);
                for (c = 0; c < a.url.length; c++) {
                    var g;
                    g = document.createElement("source");
                    "" != a.url[c] && "#" != a.url[c] && (g.setAttribute("src", na(a.url[c])), a.obj.appendChild(g))
                }
                a.obj.volume = a.i * Y;
                0 == a.loop && (a.obj.r = 1E7);
                1 <= a.loop && (a.obj.r = a.loop - 1);
                if ((1 == a.mode || 2 == a.mode || 3 == a.mode || 5 == a.mode) && 0 <= a.loop) a.obj.autoplay = l;
                0 <= d ? C[d] = a : C.push(a);
                0 < a.obj.childNodes.length && (b.c.appendChild(a.obj), a.obj.addEventListener("ended", function() {
                    if (0 < this.r) return this.r--, this.currentTime = 0, this.play(), l
                }, r))
            }
        } catch (H) {}
    }

    function ma() {
        var a;
        aa = document.createElement("div");
        aa.innerHTML = Jd("PGRpdiBzdHlsZT0icG9zaXRpb246IHJlbGF0aXZlOyBsZWZ0OiAwcHg7IHJpZ2h0OiAwcHg7IHRvcDogNDAlOyBib3R0b206IDYwJTsgbWFyZ2luOiBhdXRvOyB3aWR0aDogMThlbTsgaGVpZ2h0OiA0ZW07IGJvcmRlcjogM3B4IHNvbGlkICM1NTU7IGJveC1zaGFkb3c6IDVweCA1cHggMTBweCAjMzMzOyBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgZGlzcGxheTogdGFibGU7IGZvbnQtZmFtaWx5OiBWZXJkYW5hLCBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmOyBmb250LXNpemU6IDEwcHQ7IG9wYWNpdHk6IDAuOTU7IGJvcmRlci1yYWRpdXM6IDE1cHg7Ij48cCBzdHlsZT0idGV4dC1hbGlnbjogY2VudGVyOyBkaXNwbGF5OiB0YWJsZS1jZWxsOyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyAiPkNyZWF0ZWQgd2l0aCA8YSBocmVmPSJodHRwOi8vcGFubzJ2ci5jb20vIiB0YXJnZXQ9Il9ibGFuayI+UGFubzJWUjwvYT48L3A+PC9kaXY+");
        a = "top:  0px;left: 0px;width: 100px;height: 100px;overflow: hidden;z-index: 5000;position:relative;";
        "-webkit-" == I && (a += I + "transform: translateZ(99999999999999px);");
        aa.setAttribute("style", a);
        b.c.insertBefore(aa, b.c.firstChild);
        aa.style.width = 0 + Z + $b + z + "px";
        aa.style.height = 0 + ba + ac + t + "px";
        aa.onclick = function() {
            aa && (b.c.removeChild(aa), aa = o)
        };
        aa.oncontextmenu = aa.onclick
    }

    function qb() {
        var a;
        a = new P;
        a.Oa(y, u);
        for (var d = 0; d < C.length + x.length; d++) {
            var c;
            c = d < C.length ? C[d] : x[d - C.length];
            if (c.obj) {
                var b;
                b =
                    c.pan - y;
                for (var e = c.tilt - u; - 180 > b;) b += 360;
                for (; 180 < b;) b -= 360;
                var g = c.ba,
                    H = c.field;
                0 == H && (H = 0.01);
                0 > H && (H = A);
                c.n || (c.n = new P, c.n.Oa(c.pan, c.tilt));
                if (3 == c.mode) {
                    b = Math.abs(b);
                    b = b < c.s ? 0 : b - c.s;
                    var k = c.i,
                        e = Math.abs(e),
                        e = e < c.M ? 0 : e - c.M,
                        n = 1 - e / H;
                    if (Math.abs(b) > H || 0 > n) c.obj.volume = k * g * Y;
                    else {
                        var h = 1 - Math.abs(b / H);
                        c.obj.volume = k * (g + (1 - g) * n * h) * Y
                    }
                }
                4 == c.mode && c.hb == o && (Math.abs(b) < c.s && Math.abs(e) < c.M ? c.ha || (c.ha = l, c.obj.play()) : c.ha = r);
                5 == c.mode && (b = 180 * Math.acos(a.wa(c.n)) / Math.PI, b < c.s ? c.obj.volume = c.i * Y : (b -=
                    c.s, b < H && 0 < H ? (h = 1 - Math.abs(b / H), c.obj.volume = c.i * (g + (1 - g) * h) * Y) : c.obj.volume = g * Y));
                6 == c.mode && (b = 180 * Math.acos(a.wa(c.n)) / Math.PI, Math.abs(b) < c.s ? c.ha || (c.ha = l, c.obj.play()) : c.ha = r)
            }
        }
    }

    function Va() {
        setTimeout(function() {
            b.setFullscreen(r)
        }, 10);
        setTimeout(function() {
            b.setFullscreen(r)
        }, 100)
    }

    function Ca() {
        var a = new Date;
        bc = 0;
        cc && (b.setViewerSize(b.ca.offsetWidth, b.ca.offsetHeight), cc = r, Mc());
        0 <= Q && (Oa ? (oa = 0.4 * (Ea - rb), pa = 0.4 * (Fa - sb), rb += oa, sb += pa) : (oa = 0.1 * -tb * fb / 8, pa = 0.1 * -ub * fb / 8), Nc(oa, pa), b.update());
        vb && (b.changeFov(0.4 * (V - A)), 0.001 > Math.abs(V - A) / A && (vb = r), b.update());
        if (dc && (0 != oa || 0 != pa) && 0 > Q) oa *= 0.9, pa *= 0.9, 0.1 > oa * oa + pa * pa ? pa = oa = 0 : (Nc(oa, pa), b.update());
        if (0 != Pa) {
            var d = fb / 8;
            switch (Pa) {
                case 37:
                    b.changePan(d * fa(), l);
                    break;
                case 38:
                    b.changeTilt(d * fa(), l);
                    break;
                case 39:
                    b.changePan(-d * fa(), l);
                    break;
                case 40:
                    b.changeTilt(-d * fa(), l);
                    break;
                case 43:
                case 107:
                case 16:
                    b.changeFovLog(-d, l);
                    break;
                case 17:
                case 18:
                case 109:
                case 45:
                case 91:
                    b.changeFovLog(d, l)
            }
            b.update()
        }
        if (!b.isLoaded && b.hasConfig) {
            var c = 0,
                f = b.checkLoaded.length;
            if (wb) f = 50, ec < f && ec++, c = ec;
            else
                for (d = 0; d < f; d++) b.checkLoaded[d].complete && "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYBgeACDAAADIAAE3iTbkAAAAAElFTkSuQmCC" != b.checkLoaded[d].src && c++;
            c == f ? (Ib = 1, b.isLoaded = l, b.divSkin && b.divSkin.ggLoaded && b.divSkin.ggLoaded()) : Ib = c / (1 * f)
        }
        for (; 360 < y;) y -= 360;
        for (; - 360 > y;) y += 360;
        if (xb) {
            F = fc - y;
            if (360 == gb - hb) {
                for (; - 180 > F;) F += 360;
                for (; 180 < F;) F -= 360
            }
            O = gc - u;
            N = hc -
                A;
            d = Oc * fa();
            c = Math.sqrt(F * F + O * O + N * N);
            if (10 * c < d) {
                if (xb = r, N = O = F = 0, b.onMoveComplete) b.onMoveComplete()
            } else c = c > 5 * d ? d / c : 0.2, F *= c, O *= c, N *= c;
            y += F;
            u += O;
            A += N;
            ic = a.getTime();
            b.update()
        } else if (ga)
            if (d = a.getTime() - ib, 0 < jc && b.Ba && d >= 1E3 * jc) {
                if (1 < sa.length) {
                    if (Pc) {
                        d = 1E3;
                        do c = sa[Math.floor(Math.random() * sa.length)]; while (d-- && c == Hb)
                    } else d = sa.indexOf(Hb), d++, d >= sa.length && (d = 0), c = sa[d];
                    ib = a.getTime();
                    b.openNext("{" + c + "}")
                }
            } else O = Jb * (0 - u) / 100, N = Jb * (Kb - A) / 100, F = 0.95 * F + 0.05 * -Qa * fa(), y += F, u += O, A += N, b.update();
        else {
            if (yb &&
                0 > Q && a.getTime() - ic > 1E3 * kc && (lc && b.isLoaded || !lc)) ga = l, ib = a.getTime(), N = O = F = 0;
            if (dc && 0 == Pa && 0 > Q && (0 != F || 0 != O || 0 != N)) F *= 0.9, O *= 0.9, N *= 0.9, y += F, u += O, b.changeFovLog(N), 1.0E-4 > F * F + O * O + N * N && (N = O = F = 0), b.update()
        }
        Qc && (Lb ? a.getTime() - mc >= 1E3 * Rc && (Lb = r) : (Ra += jb, 0 > Ra && (Ra = 0, jb = -jb, Lb = l, mc = a.getTime()), 1 < Ra && (Ra = 1, jb = -jb, Lb = l, mc = a.getTime()), b.setOverlayOpacity(Ra)));
        if (0 < x.length)
            for (d = 0; d < x.length; d++) x[d].Ra && x[d].$a != x[d].obj.currentTime && (x[d].$a = x[d].obj.currentTime, !x[d].Va && 0 < x[d].obj.videoHeight && (x[d].Va =
                x[d].obj.videoWidth / x[d].obj.videoHeight));
        if (0 < R) {
            if (2 == R)
                for (d = 0; d < J.length; d++) a = J[d], "poly" == a.type && a.B != a.p && (a.B > a.p ? (a.p += 0.05, a.B < a.p && (a.p = a.B)) : (a.p -= 0.05, a.B > a.p && (a.p = a.B)), b.update());
            3 == R && wa != ha && (wa > ha ? (ha += 0.05, wa < ha && (ha = wa)) : (ha -= 0.05, wa > ha && (ha = wa)), b.update())
        }
        qb();
        b.dirty && (0 < b.ka ? b.ka-- : (b.dirty = r, b.ka = 0), b.updatePanorama());
        Sc ? setTimeout(function() {
            Ca()
        }, 1E3 / 60) : Tc(function() {
            Ca()
        })
    }

    function Wa() {
        setTimeout(function() {
            Wa()
        }, 200);
        5 < bc && (Tc = function() {
            return function(a) {
                window.setTimeout(a,
                    10)
            }
        }, Sc = l, Ca());
        bc++
    }

    function fa() {
        return Math.min(1, 2 * Math.tan(Math.PI * A / 360))
    }

    function Xa(a) {
        b.skinObj && b.skinObj.hotspotProxyClick && b.skinObj.hotspotProxyClick(a.id);
        "" != a.url && (b.openUrl(a.url, a.target), Uc(-1, -1))
    }

    function Da() {
        b.isFullscreen && (Mb() || b.exitFullscreen(), Mb() && (b.c.style.left = "0px", b.c.style.top = "0px"))
    }

    function Ya() {
        Pa = 0
    }

    function Za(a) {
        Pa && (Pa = 0, a.preventDefault(), K())
    }

    function $a(a) {
        Nb || (b.isFullscreen && a.preventDefault(), Pa = a.keyCode, K())
    }

    function Ma(a) {
        ca || (a.preventDefault(),
            K(), Sa && Sa.reset())
    }

    function ab(a) {
        ca || (a.preventDefault(), 1 != a.scale && (vb = l, Ob *= a.scale, V = kb / Math.sqrt(Ob), V > qa && (V = qa), V < ia && (V = ia), b.update(), K()))
    }

    function bb(a) {
        !ca && Ga(a.target) && (a.preventDefault(), vb = l, V = kb / Math.sqrt(a.scale), V > qa && (V = qa), V < ia && (V = ia), b.update(), K())
    }

    function Na(a) {
        nc = l;
        Ob = 1;
        ca || (a.touches ? (b.m = a.touches.target, Ga(a.target) && (a.preventDefault(), kb = A, K())) : (a.preventDefault(), kb = A, K()))
    }

    function cb(a) {
        !Sa && window.MSGesture && (Sa = new MSGesture, Sa.target = b.control);
        Sa && Sa.addPointer(a.pointerId)
    }

    function db() {
        ca || (Q = -2)
    }

    function eb(a) {
        var d;
        if (!ca) {
            0 <= Q && K();
            var c = (new Date).getTime();
            d = -1;
            var f, e, g = l;
            d = Math.abs(Vc - zb) + Math.abs(Wc - Ab);
            if (0 <= d && 20 > d) {
                a.preventDefault();
                if (Ga(b.m) && (f = oc(b.mouse.x, b.mouse.y))) b.hotspot = f;
                if (b.m) {
                    d = b.m;
                    for (e = r; d && d != b.control;) d.onclick && !e && (d.onclick(), e = l, g = r), d = d.parentNode
                }
                d = Math.abs(Xc - zb) + Math.abs(Yc - Ab);
                if (700 > c - b.ea && 0 <= d && 20 > d) {
                    a.preventDefault();
                    Ga(b.m) && pc && setTimeout(function() {
                        b.toggleFullscreen()
                    }, 1);
                    if (b.m) {
                        d = b.m;
                        for (e = r; d && d != b.control;) d.ondblclick &&
                            !e && (d.ondblclick(), e = l, g = r), d = d.parentNode
                    }
                    b.ea = 0
                } else b.ea = c;
                Xc = zb;
                Yc = Ab
            }
            if (b.m) {
                a.preventDefault();
                d = b.m;
                for (e = r; d && d != b.control;) {
                    if (d.onmouseout) d.onmouseout();
                    d.onmouseup && !e && (d.onmouseup(), e = l);
                    d = d.parentNode
                }
            }
            b.m = o;
            Q = -11;
            f && g && Xa(f);
            b.hotspot = b.emptyHotspot
        }
    }

    function Kd(a) {
        a || (a = window.event);
        var d = a.touches,
            c = Bb();
        b.mouse.x = d[0].pageX - c.x;
        b.mouse.y = d[0].pageY - c.y;
        if (!ca) {
            d[0] && (zb = d[0].pageX, Ab = d[0].pageY);
            if (0 <= Q) {
                a.preventDefault();
                for (c = 0; c < d.length; c++)
                    if (d[c].identifier == Q) {
                        Zc(d[c].pageX,
                            d[c].pageY);
                        break
                    }
                K()
            }
            2 == d.length && d[0] && d[1] && (Q = -6, nc || ($c = Math.sqrt((d[0].pageX - d[1].pageX) * (d[0].pageX - d[1].pageX) + (d[0].pageY - d[1].pageY) * (d[0].pageY - d[1].pageY)), vb = l, V = kb * Math.sqrt(ad / $c), V > qa && (V = qa), V < ia && (V = ia), K(), a.preventDefault()))
        }
    }

    function Ld(a) {
        a || (a = window.event);
        var d = a.touches,
            c = Bb();
        b.mouse.x = d[0].pageX - c.x;
        b.mouse.y = d[0].pageY - c.y;
        if (!ca) {
            if (0 > Q && d[0]) {
                qc = (new Date).getTime();
                Vc = d[0].pageX;
                Wc = d[0].pageY;
                zb = d[0].pageX;
                Ab = d[0].pageY;
                b.m = d[0].target;
                if (Ga(a.target)) {
                    if ((c = bd(b.mouse.x,
                            b.mouse.y)) && c.o) c.o();
                    else {
                        var c = d[0].pageX,
                            f = d[0].pageY;
                        rc = c;
                        sc = f;
                        Ea = c;
                        Fa = f;
                        rb = c;
                        sb = f;
                        Q = d[0].identifier
                    }
                    a.preventDefault();
                    K()
                }
                if (b.m) {
                    c = b.m;
                    for (flag = r; c && c != b.control;) {
                        if (c.onmouseover) c.onmouseover();
                        c.onmousedown && !flag && (c.onmousedown(), flag = l);
                        c = c.parentNode
                    }
                    flag && a.preventDefault()
                }
            }
            1 < d.length && (Q = -5);
            !nc && 2 == d.length && d[0] && d[1] && (ad = Math.sqrt((d[0].pageX - d[1].pageX) * (d[0].pageX - d[1].pageX) + (d[0].pageY - d[1].pageY) * (d[0].pageY - d[1].pageY)), kb = A);
            ub = tb = 0
        }
    }

    function tc(a) {
        if (!uc && (a = a ? a : window.event,
                Ga(a.target))) {
            var d = a.detail ? -1 * a.detail : a.wheelDelta / 40;
            cd && (d = -d);
            a.axis && (-1 == Pb ? Pb = a.axis : Pb != a.axis && (d = 0));
            var c = 0 < d ? 1 : -1;
            0 != d && (b.changeFovLog(c * dd, l), b.update());
            a.preventDefault();
            K()
        }
    }

    function ed(a) {
        a = a ? a : window.event;
        Pb = -1;
        if (!ca && 0 <= Q) {
            a.preventDefault();
            Q = -3;
            ub = tb = 0;
            var a = (new Date).getTime(),
                d = -1,
                d = Math.abs(rc - Ea) + Math.abs(sc - Fa);
            400 > a - qc && 0 <= d && 20 > d && ((d = oc(b.mouse.x, b.mouse.y)) && Xa(d), d = Math.abs(fd - Ea) + Math.abs(gd - Fa), 700 > a - b.ea && 0 <= d && 20 > d ? (pc && setTimeout(function() {
                    b.toggleFullscreen()
                },
                10), b.ea = 0) : b.ea = a, fd = Ea, gd = Fa);
            K()
        }
    }

    function hd(a) {
        var a = a ? a : window.event,
            d = Bb();
        Mb() ? (b.mouse.x = a.clientX - Z, b.mouse.y = a.clientY - ba) : (b.mouse.x = a.pageX - d.x, b.mouse.y = a.pageY - d.y);
        if (!ca && (0 <= Q && (a.preventDefault(), (a.which || 0 == a.which || 1 == a.which) && Zc(a.pageX, a.pageY), K()), b.hotspot == b.emptyHotspot || "poly" == b.hotspot.type)) {
            var c = b.emptyHotspot;
            0 < J.length && Ga(a.target) && (c = oc(b.mouse.x, b.mouse.y));
            b.hotspot != c && (b.hotspot != b.emptyHotspot && (0 < R && (b.hotspot.B = 0), b.skinObj && b.skinObj.hotspotProxyOut &&
                b.skinObj.hotspotProxyOut(b.hotspot.id)), c ? (b.hotspot = c, b.skinObj && b.skinObj.hotspotProxyOver && b.skinObj.hotspotProxyOver(b.hotspot.id), S.style.cursor = "pointer", 0 < R && (wa = 1, b.hotspot.B = 1)) : (b.hotspot = b.emptyHotspot, S.style.cursor = "auto", 0 < R && (wa = 0)));
            Uc(a.pageX - d.x, a.pageY - d.y)
        }
    }

    function Uc(a, d) {
        var c = Qb;
        c.enabled && (b.hotspot != b.emptyHotspot && 0 <= a && 0 <= d && "" != b.hotspot.title ? (M.innerHTML = b.hotspot.title, M.style.color = Ha(c.Ea, c.Da), M.style.backgroundColor = c.background ? Ha(c.O, c.N) : "transparent", M.style.border =
            "solid " + Ha(c.Q, c.P) + " " + c.ya + "px", M.style.borderRadius = c.xa + "px", M.style.textAlign = "center", 0 < c.width ? (M.style.left = a - c.width / 2 + Z + "px", M.style.width = c.width + "px") : (M.style.width = "auto", M.style.left = a - M.offsetWidth / 2 + Z + "px"), M.style.height = 0 < c.height ? c.height + "px" : "auto", M.style.top = d + 25 + +ba + "px", M.style.visibility = "inherit", M.style.overflow = "hidden") : (M.style.visibility = "hidden", M.innerHTML = ""))
    }

    function id(a) {
        var d = Bb();
        Mb() ? (b.mouse.x = a.clientX - Z, b.mouse.y = a.clientY - ba) : (b.mouse.x = a.pageX - d.x,
            b.mouse.y = a.pageY - d.y);
        if (aa) aa.onclick();
        if (!ca) {
            a = a ? a : window.event;
            if ((a.which || 0 == a.which || 1 == a.which) && Ga(a.target)) {
                if ((d = bd(b.mouse.x, b.mouse.y)) && d.o) d.o();
                else {
                    var d = a.pageX,
                        c = a.pageY;
                    rc = d;
                    sc = c;
                    Ea = d;
                    Fa = c;
                    rb = d;
                    sb = c;
                    Q = 1;
                    qc = (new Date).getTime()
                }
                a.preventDefault();
                K()
            }
            ub = tb = 0
        }
    }

    function Mb() {
        return document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement && document.msFullscreenElement != o || document.fullScreen
    }

    function bd(a, d) {
        var c = b.R(),
            f;
        for (f = 0; f < x.length + ea.length; f++) {
            var e;
            e = f < x.length ? x[f] : ea[f - x.length];
            if (e.v) return e
        }
        for (f = 0; f < x.length + ea.length; f++) {
            e = f < x.length ? x[f] : ea[f - x.length];
            var g = [],
                H = new P,
                k, n, h;
            0 < e.I && (n = Math.tan(e.I / 2 * Math.PI / 180), h = 0 < e.z ? n * e.C / e.z : n, e.K && 1 != e.K && (h *= e.K));
            for (k = 0; 4 > k; k++) {
                switch (k) {
                    case 0:
                        H.q(-n, -h, -1);
                        break;
                    case 1:
                        H.q(n, -h, -1);
                        break;
                    case 2:
                        H.q(n, h, -1);
                        break;
                    case 3:
                        H.q(-n, h, -1)
                }
                H.k(-e.tilt * Math.PI / 180);
                H.l(e.pan * Math.PI / 180);
                H.l(-y * Math.PI / 180);
                H.k(u * Math.PI / 180);
                g.push(H.La())
            }
            g = Rb(g);
            if (0 < g.length) {
                for (k = 0; k < g.length; k++) {
                    H = g[k];
                    if (0.1 > H.e) {
                        var m = -c / H.e;
                        px = z / 2 + H.x * m;
                        py = t / 2 + H.y * m
                    } else py = px = 0;
                    H.Z = px;
                    H.F = py
                }
                if (jd(g, a, d)) return e
            }
        }
    }

    function Ga(a) {
        return a == b.control || a && a.ggType && "container" == a.ggType ? l : r
    }

    function K() {
        ga && (ga = r, N = O = F = 0);
        xb && (xb = r, N = O = F = 0);
        ic = (new Date).getTime()
    }

    function Zc(a, d) {
        vc = a;
        wc = d;
        tb = vc - Ea;
        ub = wc - Fa;
        Oa && (Ea = vc, Fa = wc, b.update())
    }

    function Nc(a, d) {
        var c = b.getVFov();
        y += a * c / t;
        u += d * c / t;
        Ta()
    }

    function kd(a) {
        xc = g.createBuffer();
        g.bindBuffer(g.ARRAY_BUFFER, xc);
        var d = [-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1];
        for (i = 0; 12 > i; i++) 2 >
            i % 3 && (d[i] *= a);
        g.bufferData(g.ARRAY_BUFFER, new Float32Array(d), g.STATIC_DRAW);
        Sb = g.createBuffer();
        g.bindBuffer(g.ARRAY_BUFFER, Sb);
        g.bufferData(g.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 0, 1, 1, 1]), g.STATIC_DRAW);
        Tb = g.createBuffer();
        g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, Tb);
        g.bufferData(g.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), g.STATIC_DRAW)
    }

    function ld() {
        var a, d;
        if (da)
            for (; 0 < da.length;) g.deleteTexture(da.pop());
        da = [];
        for (var c = 0; 6 > c; c++) d = g.createTexture(), d.va = o, d.ra = o, d.Qa = r, g.bindTexture(g.TEXTURE_2D,
            d), g.texImage2D(g.TEXTURE_2D, 0, g.RGB, 1, 1, 0, g.RGB, g.UNSIGNED_BYTE, o), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE), lb[c] && (a = new Image, a.crossOrigin = b.aa, a.src = na(lb[c]), d.va = a, a.addEventListener && a.addEventListener("load", yc(d), r), b.checkLoaded.push(a)), da.push(d);
        for (c = 0; 6 > c; c++) Ub[c] && (a = new Image, a.crossOrigin = b.aa, a.src = na(Ub[c]), a.addEventListener ? a.addEventListener("load",
            yc(da[c]), r) : a.onload = yc(da[c]), da[c].ra = a, b.checkLoaded.push(a));
        for (c = 0; c < x.length; c++) x[c].gb = g.createTexture(), g.bindTexture(g.TEXTURE_2D, x[c].gb), g.texImage2D(g.TEXTURE_2D, 0, g.RGB, 1, 1, 0, g.RGB, g.UNSIGNED_BYTE, o), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
        g.bindTexture(g.TEXTURE_2D, o)
    }

    function md(a) {
        var d = curCfNr,
            c = tx,
            b = ty,
            e = D.length - 1 - a,
            g = nd,
            h = "x";
        switch (d) {
            case 0:
                h =
                    "f";
                break;
            case 1:
                h = "r";
                break;
            case 2:
                h = "b";
                break;
            case 3:
                h = "l";
                break;
            case 4:
                h = "u";
                break;
            case 5:
                h = "d"
        }
        for (var k = 0; 3 > k; k++) g = Ia(g, "c", d), g = Ia(g, "s", h), g = Ia(g, "r", a), g = Ia(g, "l", e), g = Ia(g, "x", c), g = Ia(g, "y", b), g = Ia(g, "v", b), g = Ia(g, "h", c);
        return na(g)
    }

    function Ia(a, d, c) {
        var b = RegExp("%0*" + d, "i").exec(a.toString());
        if (b) {
            var b = b.toString(),
                e = c.toString();
            for (b.charAt(b.length - 1) != d && (e = (1 + c).toString()); e.length < b.length - 1;) e = "0" + e;
            a = a.replace(b, e)
        }
        return a
    }

    function na(a) {
        return a ? "{" == a.charAt(0) || "/" == a.charAt(0) ||
            0 < a.indexOf("://") || 0 == a.indexOf("javascript:") ? a : Cb + a : Cb
    }

    function yc(a) {
        return function() {
            try {
                if (a.eb) return;
                g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, l);
                var d = r;
                a.ra != o && a.ra.complete ? a.Qa || (g.bindTexture(g.TEXTURE_2D, a), g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, a.ra), d = a.Qa = l) : a.va != o && a.va.complete && (g.bindTexture(g.TEXTURE_2D, a), g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, a.va), d = l);
                d && (g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR), g.texParameteri(g.TEXTURE_2D,
                    g.TEXTURE_MIN_FILTER, g.LINEAR), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE), a.loaded = l);
                g.bindTexture(g.TEXTURE_2D, o)
            } catch (c) {}
            b.update()
        }
    }

    function Zb() {
        var a = Math.round(b.R()),
            d;
        for (d = 0; d < x.length + ea.length; d++) {
            var c;
            c = d < x.length ? x[d] : ea[d - x.length];
            ja || od(a);
            var f = "";
            ja && (f += "perspective(" + a + "px) ");
            var f = f + ("translate3d(0px,0px," + a + "px) "),
                f = f + ("rotateX(" + u.toFixed(10) + "deg) "),
                f = f + ("rotateY(" + (-y).toFixed(10) + "deg) "),
                f = f + ("rotateY(" + c.pan.toFixed(10) + "deg) "),
                f = f + ("rotateX(" + (-c.tilt).toFixed(10) + "deg) "),
                e = 1E4,
                g = c.obj.videoWidth,
                h = c.obj.videoHeight;
            if (0 == g || 0 == h) g = 640, h = 480;
            0 < c.z && (g = c.z);
            0 < c.C && (h = c.C);
            0 < g && 0 < h && (c.obj.width = g + "px", c.obj.ab = h + "px", c.obj.style.width = g + "px", c.obj.style.ab = h + "px");
            0 < c.I && (e = g / (2 * Math.tan(c.I / 2 * Math.PI / 180)));
            f += "translate3d(0px,0px," + (-e).toFixed(10) + "px) ";
            f += "rotateZ(" + c.ga.toFixed(10) + "deg) ";
            f += "rotateY(" + (-c.l).toFixed(10) + "deg) ";
            f += "rotateX(" + c.k.toFixed(10) + "deg) ";
            c.K &&
                1 != c.K && (f += "scaleY(" + c.K + ") ");
            f += "translate3d(" + -g / 2 + "px," + -h / 2 + "px,0px) ";
            c.obj.style[T + "Origin"] = "0% 0%";
            c.v && (f = "", 1 == c.u && (e = Math.min(z / g, t / h), f += "scale(" + e + ") "), f += "translate3d(" + -g / 2 + "px," + -h / 2 + "px,0px) ");
            c.Za != f && (c.Za = f, c.obj.style[T] = f, c.obj.style.left = Z + z / 2 + "px", c.obj.style.top = ba + t / 2 + "px", c.obj.style.visibility = "visible", c.oa && c.Ya == c.v && (c.obj.style[va] = "all 0s linear 0s"), c.Ya = c.v)
        }
    }

    function pd() {
        for (var a = 0, d = Math.tan(b.getVFov() * Math.PI / 360), c = t / (2 * d), c = c * (1 + d * (z / t) / 2), c = c * Math.pow(2,
                qd); D.length >= a + 2 && !D[a + 1].Ta && D[a + 1].width > c;) a++;
        return a
    }

    function rd() {
        for (var a = 0; a < D.length; a++) {
            level = D[a];
            for (var d in level.g) level.g.hasOwnProperty(d) && (level.g[d].ja = r)
        }
    }

    function sd() {
        var a;
        for (a = 0; 6 > a; a++) {
            var d;
            d = b.f.j[a];
            if (d.D) {
                var c;
                c = [];
                c.push(new P(-1, -1, -1, 0, 0));
                c.push(new P(1, -1, -1, 1, 0));
                c.push(new P(1, 1, -1, 1, 1));
                c.push(new P(-1, 1, -1, 0, 1));
                for (var f = 0; f < c.length; f++) 4 > a ? c[f].l(a * (-Math.PI / 2)) : c[f].k((4 == a ? -1 : 1) * (Math.PI / 2)), c[f].l(-y * Math.PI / 180), c[f].k(u * Math.PI / 180);
                c = Rb(c);
                for (var e = {
                        ma: 1,
                        na: 1,
                        pa: 0,
                        qa: 0
                    }, f = 0; f < c.length; f++) e.ma = Math.min(e.ma, c[f].H), e.pa = Math.max(e.pa, c[f].H), e.na = Math.min(e.na, c[f].n), e.qa = Math.max(e.qa, c[f].n);
                e.Ga = e.pa - e.ma;
                e.Ka = e.qa - e.na;
                e.scale = Math.max(e.Ga, e.Ka);
                d.ta = e
            } else d.ta = o
        }
    }

    function td(a) {
        var d = level,
            c = {};
        c.T = a.ma * (d.width / L);
        c.U = a.na * (d.height / L);
        c.X = a.pa * (d.width / L);
        c.Y = a.qa * (d.height / L);
        c.T = Math.min(Math.max(0, Math.floor(c.T)), d.G - 1);
        c.U = Math.min(Math.max(0, Math.floor(c.U)), d.$ - 1);
        c.X = Math.min(Math.max(0, Math.floor(c.X)), d.G - 1);
        c.Y = Math.min(Math.max(0,
            Math.floor(c.Y)), d.$ - 1);
        return c
    }

    function ud(a) {
        return function() {
            b.dirty = l;
            b.S = l;
            U && U--;
            0 == U && b.divSkin && b.divSkin.ggLoadedLevels && b.divSkin.ggLoadedLevels();
            a.a = o
        }
    }

    function Md(a) {
        return function() {
            b.dirty = l;
            b.Na = l;
            b.S = l;
            a.loaded = l;
            a.a && !a.b && s.appendChild(a.a);
            U && U--;
            0 == U && b.divSkin && b.divSkin.ggLoadedLevels && b.divSkin.ggLoadedLevels();
            a.a && a.d && (a.d.drawImage(a.a, 0, 0), a.a = o)
        }
    }

    function vd() {
        return function() {
            b.dirty = l;
            b.S = l;
            U && U--;
            0 == U && b.divSkin && b.divSkin.ggLoadedLevels && b.divSkin.ggLoadedLevels()
        }
    }

    function Nd(a) {
        return function() {
            b.dirty = l;
            b.Na = l;
            b.S = l;
            a.loaded = l;
            U && U--;
            0 == U && b.divSkin && b.divSkin.ggLoadedLevels && b.divSkin.ggLoadedLevels();
            try {
                g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, l), a.a != o && a.a.complete && (a.L = g.createTexture(), g.bindTexture(g.TEXTURE_2D, a.L), g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, a.a), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE),
                    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE), g.bindTexture(g.TEXTURE_2D, o))
            } catch (d) {}
            b.update()
        }
    }

    function Ta() {
        var a, d;
        0 < zc && (a = mb, D && 0 < D.length && (a = D[0].height), ia = 360 * Math.atan2(t / 2, a / 2 * zc) / Math.PI);
        A < ia && (A = ia);
        A > qa && (A = qa);
        d = b.getVFov() / 2;
        a = 180 * Math.atan(z / t * Math.tan(d * Math.PI / 180)) / Math.PI;
        2 * d > Ja - Ka && (d = (Ja - Ka) / 2);
        b.setVFov(2 * d);
        90 > Ja ? u + d > Ja && (u = Ja - d) : u > Ja && (u = Ja); - 90 < Ka ? u - d < Ka && (u = Ka + d) : u < Ka && (u = Ka);
        if (359.99 > gb - hb) {
            var c = 0;
            if (0 != u) {
                var f, e = t / 2;
                f = e * Math.tan(d * Math.PI / 180);
                e /= Math.tan(Math.abs(u) * Math.PI / 180);
                e -= f;
                0 < e && (c = 180 * Math.atan(1 / (e / f)) / Math.PI, c = c * (gb - hb) / 360)
            }
            y + (a + c) > gb && (y = gb - (a + c), ga && (Qa = -Qa, F = 0));
            y - (a + c) < hb && (y = hb + (a + c), ga && (Qa = -Qa, F = 0));
            90 < u + d && (u = 90 - d); - 90 > u - d && (u = -90 + d)
        }
    }

    function oc(a, d) {
        var c = -1;
        if (0 <= R)
            for (var b = 0; b < J.length; b++) {
                var e = J[b];
                "poly" == e.type && e.ua && 0 < e.ua.length && jd(e.ua, a, d) && (c = b)
            }
        return 0 <= c ? J[c] : r
    }

    function jd(a, d, c) {
        var b, e, g = r;
        for (b = 0, e = a.length - 1; b < a.length; e = b++) {
            var h = a[b];
            e = a[e];
            h.F > c != e.F > c && d < (e.Z - h.Z) * (c - h.F) / (e.F - h.F) + h.Z &&
                (g = !g)
        }
        return g
    }

    function Ha(a, d) {
        a = Number(a);
        return "rgba(" + (a >> 16 & 255) + "," + (a >> 8 & 255) + "," + (a & 255) + "," + d + ")"
    }

    function Mc() {
        for (var a = new P(0, 0, -100), d = b.R(), c = 0; c < J.length; c++) {
            var f = J[c],
                e, g;
            if ("point" == f.type) {
                a.q(0, 0, -100);
                a.k(-f.tilt * Math.PI / 180);
                a.l(f.pan * Math.PI / 180);
                a.l(-y * Math.PI / 180);
                a.k(u * Math.PI / 180);
                var h = r;
                0.01 > a.e ? (g = -d / a.e, e = a.x * g, g *= a.y, Math.abs(e) < z / 2 + 500 && Math.abs(g) < t / 2 + 500 && (h = l)) : g = e = 0;
                f.obj && f.obj.__div && (f.obj.__div.style[va] = "none", f.obj.ggUse3d ? (ja || od(d), f.obj.__div.style.width =
                    "1px", f.obj.__div.style.height = "1px", hs = "", ja && (hs += "perspective(" + d + "px) "), hs += "translate3d(0px,0px," + d + "px) ", hs += "rotateX(" + u.toFixed(10) + "deg) ", hs += "rotateY(" + (-y).toFixed(10) + "deg) ", hs += "rotateY(" + f.pan.toFixed(10) + "deg) ", hs += "rotateX(" + (-f.tilt).toFixed(10) + "deg) ", hs += "translate3d(0px,0px," + (-1 * f.obj.gg3dDistance).toFixed(10) + "px) ", f.obj.__div.style[T + "Origin"] = "0% 0%", f.obj.__div.style[T] = hs, f.obj.__div.style.left = Z + z / 2 + "px", f.obj.__div.style.top = ba + t / 2 + "px") : h ? (f.obj.__div.style.left =
                    Z + e + z / 2 + "px", f.obj.__div.style.top = ba + g + t / 2 + "px") : (f.obj.__div.style.left = "-1000px", f.obj.__div.style.top = "-1000px"))
            }
            if ("poly" == f.type) {
                for (var k = [], h = 0; h < f.ia.length; h++) e = f.ia[h], a.q(0, 0, -100), a.k(-e.tilt * Math.PI / 180), a.l(e.pan * Math.PI / 180), a.l(-y * Math.PI / 180), a.k(u * Math.PI / 180), k.push(a.La());
                k = Rb(k);
                if (0 < k.length)
                    for (h = 0; h < k.length; h++) a = k[h], 0.1 > a.e ? (g = -d / a.e, e = z / 2 + a.x * g, g = t / 2 + a.y * g) : g = e = 0, a.Z = e, a.F = g;
                f.ua = k
            }
        }
    }

    function od(a) {
        !ja && b.cb != a && (b.cb = a, S.style[xa] = a + "px", S.style[xa + "Origin"] = Z + z /
            2 + "px " + (ba + t / 2) + "px ", s.style[xa] = a + "px", s.style[xa + "Origin"] = Z + z / 2 + "px " + (ba + t / 2) + "px ")
    }

    function Rb(a) {
        a = Db(a, wd);
        a = Db(a, xd);
        a = Db(a, yd);
        a = Db(a, zd);
        return a = Db(a, Ad)
    }

    function Db(a, d) {
        if (0 == a.length) return a;
        var c, b, e, g, h, k, n, m = [];
        c = d.wa(a[0]) - 0;
        for (g = 0; g < a.length; g++) {
            k = g;
            n = g + 1;
            n == a.length && (n = 0);
            b = d.wa(a[n]) - 0;
            if (0 <= c && 0 <= b) m.push(a[k]);
            else if (0 <= c || 0 <= b) e = b / (b - c), 0 > e && (e = 0), 1 < e && (e = 1), h = new P, h.bb(a[k], a[n], e), 0 > c || m.push(a[k]), m.push(h);
            c = b
        }
        return m
    }

    function Bb() {
        var a = {
                x: 0,
                y: 0
            },
            d = s;
        if (d.offsetParent) {
            do a.x +=
                d.offsetLeft, a.y += d.offsetTop; while (d = d.offsetParent)
        }
        return a
    }

    function ya() {
        cc = l
    }

    function Bd(a) {
        if (debug = document.getElementById("debug")) debug.innerHTML = a + "<br />";
        window.console && window.console.log(a)
    }
    var Qb, R, ha, wa, Ac, Bc, Cc, Dc, Ec;

    function Jd(a) {
        var d = "",
            c, b, e = "",
            g, h = "",
            k = 0,
            a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)),
            g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), c = c << 2 | b >> 4, b = (b & 15) << 4 | g >> 2, e = (g & 3) << 6 | h, d += String.fromCharCode(c), 64 != g && (d += String.fromCharCode(b)), 64 != h && (d += String.fromCharCode(e)); while (k < a.length);
        return d
    }

    function Od(a, b) {
        var c = this;
        c.fb = a;
        c.hotspot = b;
        c.__div = document.createElement("div");
        c.a = document.createElement("img");
        var f;
        c.a.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5xJREFUeNqclmlIVFEUx997TjrplFQW2WKBBSYtRFlpWUILSSsRZRQIBdGHCFqIoKIvQRsUFRJC9LEgaSFbMMpcWi1pLzOLsjItKms0U5t5/c/wH7nc5o2jF374xrv87z33nHOPaRsRtbFgDpgJxoD+wATfwDNQDK6CyrCr5OcbhgiGIRsUAZt4QTWoIFXgp9JfAhY7rgdBl8NeBoLDYBloA+dBOagFTcDHcVEgDgwBGWA+OAcugvXgvb5wKMGJoAAMp9BpUA96EBf/Btsf8BI8AWfAErAcpHHDZeriliY2AVwDg8AucAQ0Ag+I4XhTm2Oxz8PT46KMbTx5EZjuJDgAnAVusJUm9DhYwalFcc59sIXXIaceFkowDySBPTRPL20xm+b7zYXa+N3CPrWJ6GuwGySA40HLBHc/GywFhbS5R1lEBrZy7FQwiSaX9pmnqeAYt+KUcew7BVZw/QKTq0ocpYPVvDOXItZCk2xgDIZqL8BR8Ab0VDbr4yZOgLeIwzQx6WiQxcCt1+6sld66L4yYtFSwF4yg2dU7/cEwGW9YVkAwmycp1dzdpvgm0DcCh4kHmxWzBls0uBX4qqmZJ4KzePm1IeJLgjmlC16aDKZpp5Q168B3o6wsSwTHgU+MIUs74RSj6y1d+212HKimJlUE+tFRfJpYtOKNXWmJTASqWf2Bu/R6+4TKHOrOzG4IhptjWgHbGkZvepQ6SQK7oRuCXzjX1DJavBEX1ygfT8FgBqpfm1zRDcEKbR2bsZlkJCdXieB1ZhZ5YtqVgXIPN+m9kbY6hpdb+d9fPncJRmZmqQheZkemJmgxyxykl3XWJEkcAl7N21s7PDcl5ZJ0PAa3wVwmWtVbZafPwQ7wLozYB7ATPNJO56d/LAikP9u+66KNJS1d4IOZp7wU0hfLukUyzgwm70T2N/DOxIy/eFdqawa5DL2NEGwP5k15Ja4woz9glvcomd9NzyvkFcQo5gomaLfm5c0svnKZ2k7q7+FauvR2MJKZR3+sY5WgtvkdG6JyELGhNHMTXyGfLviRJ5Tcd4Dlhle7086Sgp8CqVxDkn4OqHaqacr5ekjy3Q/W0FRNNGmoMtamdzdxsytZC0lqXKhEgWPVVgImg2NgFT1MHOoOk3yLEtgWN5TEOYvoIFI1rGM19//2wpAD7imF7lfwENwAxaASNCj90pcLLKdC2Iyw1M9gnEplMEp5kOU1f8WwKGJm8oUr9f8JMAAVMDM6HSDa9QAAAABJRU5ErkJggg%3D%3D");
        c.a.setAttribute("style", "position: absolute;top: -14px;left: -14px; " + I + "user-select: none;");
        c.a.ondragstart = function() {
            return r
        };
        c.__div.appendChild(c.a);
        f = "position:absolute;" + (I + "user-select: none;");
        f += I + "touch-callout: none;";
        f += I + "tap-highlight-color: rgba(0,0,0,0);";
        c.__div.setAttribute("style", f);
        c.__div.onclick = function() {
            c.fb.openUrl(b.url, b.target)
        };
        var e = Qb;
        e.enabled && (c.text = document.createElement("div"), f = "position:absolute;" + ("left: -" + b.w / 2 + "px;"), f = f + "top:  20px;" + ("width: " + b.w +
                "px;"), f = 0 == b.h ? f + "height: auto;" : f + ("height: " + b.h + "px;"), b.wordwrap ? f = f + "white-space: pre-wrap;" + ("width: " + b.w + "px;") : (f = 0 == b.h ? f + "width: auto;" : f + ("width: " + b.w + "px;"), f += "white-space: nowrap;"), f += I + "transform-origin: 50% 50%;", c.text.setAttribute("style", f + "visibility: hidden;border: 1px solid #000000;background-color: #ffffff;text-align: center;overflow: hidden;padding: 0px 1px 0px 1px;"), c.text.style.color = Ha(e.Ea, e.Da), c.text.style.backgroundColor = e.background ? Ha(e.O, e.N) : "transparent", c.text.style.border =
            "solid " + Ha(e.Q, e.P) + " " + e.ya + "px", c.text.style.borderRadius = e.xa + "px", c.text.style.textAlign = "center", c.text.style.width = 0 < e.width ? e.width + "px" : "auto", c.text.style.height = 0 < e.height ? e.height + "px" : "auto", c.text.style.overflow = "hidden", c.text.innerHTML = b.title, c.__div.onmouseover = function() {
                0 == b.h && (w = c.text.offsetWidth, c.text.style.left = -w / 2 + "px");
                c.text.style.visibility = "inherit"
            }, c.__div.onmouseout = function() {
                c.text.style.visibility = "hidden"
            }, c.__div.appendChild(c.text))
    }
    var b = this;
    b.transitionsDisabled =
        r;
    var y = 0,
        Fc = 0,
        hb = 0,
        gb = 360,
        F = 0,
        Gc = 0,
        u = 0,
        Hc = 0,
        Ka = -90,
        Ja = 90,
        O = 0,
        A = 90,
        Kb = 90,
        ia = 1,
        zc = 0,
        qa = 170,
        kb = 0,
        N = 0,
        Ic = 0,
        ad, $c, z = 320,
        t = 480,
        rc = 0,
        sc = 0,
        Ea = 0,
        Fa = 0,
        fd = 0,
        gd = 0,
        vc = 0,
        wc = 0,
        tb = 0,
        ub = 0,
        Q = -1,
        Vc = 0,
        Wc = 0,
        zb = 0,
        Ab = 0,
        Xc = 0,
        Yc = 0,
        qc, dc = l,
        rb = 0,
        sb = 0,
        oa = 0,
        pa = 0,
        vb = r,
        V = 0,
        Pa = 0,
        s = o,
        za = o,
        ka = o,
        S = b.c = o,
        $ = o;
    b.control = o;
    b.checkLoaded = [];
    b.isFullscreen = r;
    b.dirty = r;
    b.ka = 1;
    b.divSkin = o;
    b.isLoaded = r;
    b.hasConfig = r;
    b.startNode = "";
    b.onMoveComplete = o;
    var Ib = 0,
        Ub = [],
        lb = [],
        mb = 1,
        Eb = 1,
        Fb = 1024,
        Cd = 0,
        Dd = 0,
        yb = r,
        kc = 5,
        ga = r,
        lc = r,
        Qa = 0.4,
        Jb = 0,
        jc = 0,
        Pc = l,
        ib, xb = r,
        Oc = 0.1,
        fc = 0,
        gc = 0,
        hc, ic;
    b.skinObj = o;
    b.userdata = {};
    b.userdata.title = "";
    b.userdata.description = "";
    b.userdata.author = "";
    b.userdata.datetime = "";
    b.userdata.copyright = "";
    b.userdata.source = "";
    b.userdata.information = "";
    b.userdata.comment = "";
    b.userdata.tags = [];
    b.aa = "anonymous";
    var J = [];
    b.emptyHotspot = {
        pan: 0,
        tilt: 0,
        title: "",
        url: "",
        target: "",
        id: "",
        skinid: "",
        w: 100,
        h: 20,
        wordwrap: r,
        obj: o,
        type: "empty"
    };
    var C = [],
        x = [],
        ea = [],
        nb = [],
        sa = [],
        Y = 1,
        D = [],
        ob = "0x000000",
        qd = 0.4,
        ra, L, nd, Ra = 0,
        jb = 0.01,
        Rc = 2,
        mc = 0,
        Lb = r,
        Qc = r,
        Z = 0,
        ba = 0,
        $b = 0,
        ac = 0,
        Nb = r,
        ca = r,
        uc = r,
        Oa = l,
        cd = r,
        dd = 1,
        pc = l,
        fb = 8;
    R = 1;
    ha = 0;
    wa = 0;
    Ac = 255;
    Bc = 1;
    Cc = 255;
    Dc = 0.3;
    Qb = {
        enabled: l,
        width: 180,
        height: 20,
        Ea: 0,
        Da: 1,
        background: l,
        O: 16777215,
        N: 1,
        Q: 0,
        P: 1,
        xa: 3,
        ya: 1,
        wordwrap: l
    };
    Ec = void 0;
    b.hotspot = b.emptyHotspot;
    var M = o;
    b.S = l;
    b.mouse = {
        x: 0,
        y: 0
    };
    var ta = r,
        Aa = r,
        wb = r,
        Vb = l,
        Ed = r,
        Jc = l,
        nc = r,
        U = 0,
        Wb = 10,
        Fd = 200,
        Cb = "",
        I = "",
        va = "transition",
        T = "transform",
        xa = "perspective",
        g, wd = new P,
        xd = new P,
        yd = new P,
        zd = new P,
        Ad = new P;
    b.Ba = r;
    var Hb = "";
    unusedTileCanvas = [];
    var Pd = navigator.userAgent.match(/(MSIE)/g) ?
        l : r,
        Gd = navigator.userAgent.match(/(Safari)/g) ? l : r;
    navigator.userAgent.match(/(Chrome)/g) && (Gd = r);
    var Hd = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? l : r,
        Qd = navigator.userAgent.match(/(android)/i) ? l : r,
        Sc = r,
        Tc = function() {
            var a = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
            return Hd || !a ? function(a) {
                window.setTimeout(a, 10)
            } : a
        }();
    b.detectBrowser = function() {
        var a = ["Webkit", "Moz", "O", "ms",
                "Ms"
            ],
            d;
        I = "";
        va = "transition";
        T = "transform";
        xa = "perspective";
        for (d = 0; d < a.length; d++) "undefined" !== typeof document.documentElement.style[a[d] + "Transform"] && (I = "-" + a[d].toLowerCase() + "-", va = a[d] + "Transition", T = a[d] + "Transform", xa = a[d] + "Perspective");
        Ed = Kc();
        ta = Lc();
        Aa = Kc();
        ta && (Aa = r);
        ja = l;
        pb = r;
        (Hd || Qd) && b.setMaxTileCount(80);
        Bd("Pano2VR player - Prefix:" + I + ", " + (Ed ? "CSS 3D available" : "CSS 3D not available") + ", " + (ta ? "WebGL available" : "WebGL not available"))
    };
    b.setMaxTileCount = function(a) {
        Fd = a
    };
    b.f = new function() {
        var a =
            this;
        a.j = [];
        a.la = [];
        for (i = 0; 6 > i; i++) a.j[i] = {
            D: l
        };
        a.za = function(b, c) {
            for (var f = 0; 6 > f; f++) {
                var e;
                if (e = a.j[f]) {
                    var g;
                    g = [];
                    g.push(new P(-1, -1, -1, 0, 0));
                    g.push(new P(1, -1, -1, 1, 0));
                    g.push(new P(1, 1, -1, 1, 1));
                    g.push(new P(-1, 1, -1, 0, 1));
                    for (var h = 0; h < g.length; h++) 4 > f ? g[h].l(f * (-Math.PI / 2)) : g[h].k((4 == f ? -1 : 1) * (Math.PI / 2)), g[h].l(-b * Math.PI / 180), g[h].k(c * Math.PI / 180);
                    g = Rb(g);
                    e.D = 0 < g.length
                }
            }
        }
    };
    b.setElementIdPrefix = function(a) {
        b.W = a
    };
    b.getPercentLoaded = function() {
        return Ib
    };
    b.setBasePath = function(a) {
        Cb = a
    };
    b.R =
        function() {
            return 1 * t / (2 * Math.tan(Math.PI / 180 * (b.getVFov() / 2)))
        };
    b.setViewerSize = function(a, d) {
        b.isFullscreen && (a = window.innerWidth, d = window.innerHeight);
        var c = a - Z - $b,
            f = d - ba - ac;
        if (!(10 > c || 10 > f)) {
            s.style.width = c + "px";
            s.style.height = f + "px";
            s.style.left = Z + "px";
            s.style.top = ba + "px";
            if (ta) try {
                za && (za.width = c, za.height = f), g && (g.Ja = c, g.Ia = f, g.viewport(0, 0, c, f))
            } catch (e) {
                alert(e)
            }
            ka && (ka.style.width = a + "px", ka.style.height = d + "px", ka.width = a, ka.height = d);
            S && (S.style.width = a + "px", S.style.height = d + "px", $.style.width =
                a + "px", $.style.height = d + "px", $.width = a, $.height = d, $.style.left = Z + "px", $.style.top = ba + "px", b.divSkin && b.divSkin != S && (b.divSkin.style.width = a + "px", b.divSkin.style.height = d + "px"));
            b.hasConfig && b.updatePanorama();
            b.divSkin && b.divSkin.ggUpdateSize && b.divSkin.ggUpdateSize(a, d)
        }
    };
    var cc = r;
    b.setMargins = function(a, b, c, f) {
        Z = a;
        ba = b;
        $b = c;
        ac = f;
        ya()
    };
    b.changeViewMode = function(a) {
        0 == a && (Oa = r);
        1 == a && (Oa = l);
        2 == a && (Oa = Oa ? r : l)
    };
    b.changePolygonMode = function(a, d) {
        R = 1 == d && 0 < R ? 0 : Math.round(a);
        b.update()
    };
    b.polygonMode =
        function() {
            return R
        };
    var W;
    b.getVFov = function() {
        var a;
        switch (Ic) {
            case 0:
                a = A / 2;
                break;
            case 1:
                a = 180 * Math.atan(t / z * Math.tan(A / 2 * Math.PI / 180)) / Math.PI;
                break;
            case 2:
                a = 180 * Math.atan(t / Math.sqrt(z * z + t * t) * Math.tan(A / 2 * Math.PI / 180)) / Math.PI;
                break;
            case 3:
                a = 4 * t / 3 > z ? A / 2 : 180 * Math.atan(4 * t / (3 * z) * Math.tan(A / 2 * Math.PI / 180)) / Math.PI
        }
        return 2 * a
    };
    b.setVFov = function(a) {
        var a = a / 2,
            b;
        switch (Ic) {
            case 0:
                A = 2 * a;
                break;
            case 1:
                a = 180 * Math.atan(z / t * Math.tan(a * Math.PI / 180)) / Math.PI;
                A = 2 * a;
                break;
            case 2:
                b = Math.sqrt(z * z + t * t);
                a = 180 * Math.atan(b /
                    t * Math.tan(a * Math.PI / 180)) / Math.PI;
                A = 2 * a;
                break;
            case 3:
                4 * t / 3 > z || (a = 180 * Math.atan(3 * z / (4 * t) * Math.tan(a * Math.PI / 180)) / Math.PI), A = 2 * a
        }
    };
    b.update = function(a) {
        b.dirty = l;
        a && (b.ka = a)
    };
    b.updatePanorama = function() {
        var a = b.R(),
            d = Math.atan2(z / 2 + 1, a),
            c = Math.atan2(t / 2 + 1, a),
            a = Math.sin(d),
            f = Math.sin(c),
            d = Math.cos(d),
            c = Math.cos(c);
        wd.q(0, 0, -1);
        xd.q(d, 0, -a);
        yd.q(-d, 0, -a);
        zd.q(0, c, -f);
        Ad.q(0, -c, -f);
        Mc();
        if ($ && (Ec != R && (Ec = R, $.style.visibility = 0 < R ? "inherit" : "hidden"), 0 < R)) {
            W || (W = $.getContext("2d"));
            if (W.width != z || W.height !=
                t) W.width = z, W.height = t;
            W.clear ? W.clear() : W.clearRect(0, 0, $.width, $.height);
            a = 1;
            3 == R && (a = ha);
            for (f = 0; f < J.length; f++)
                if (d = J[f], "poly" == d.type && (c = d.ua, 2 == R && (a = d.p), W.fillStyle = Ha(d.O, d.N * a), W.strokeStyle = Ha(d.Q, d.P * a), 0 < c.length)) {
                    W.beginPath();
                    for (j = 0; j < c.length; j++) v = c[j], 0 == j ? W.moveTo(v.Z, v.F) : W.lineTo(v.Z, v.F);
                    W.closePath();
                    W.stroke();
                    W.fill()
                }
        }
        if (ta)
            if (0 < D.length) {
                Ta();
                if (z != s.offsetWidth || t != s.offsetHeight) z = parseInt(s.offsetWidth), t = parseInt(s.offsetHeight);
                Jc && (b.initWebGL(0), ya());
                if (g) {
                    g.clear(g.COLOR_BUFFER_BIT |
                        g.DEPTH_BUFFER_BIT);
                    Ba(La);
                    Yb(b.getVFov(), g.Ja / g.Ia, La);
                    g.uniformMatrix4fv(E.sa, r, La);
                    b.f.za(y, u);
                    Wb = 1;
                    sd();
                    rd();
                    var e = pd(),
                        h;
                    for (h = D.length - 1; h >= e;) {
                        level = D[h];
                        a = 1;
                        h == D.length - 1 && 0 == ra && (a = L / (L - 0.5));
                        for (curCfNr = 0; 6 > curCfNr; curCfNr++)
                            if (f = b.f.j[curCfNr], d = f.ta, Ba(la), Gb(la, -u * Math.PI / 180, [1, 0, 0]), Gb(la, (180 - y) * Math.PI / 180, [0, 1, 0]), 4 > curCfNr ? Gb(la, -Math.PI / 2 * curCfNr, [0, 1, 0]) : Gb(la, Math.PI / 2 * (5 == curCfNr ? 1 : -1), [1, 0, 0]), f.D && d && 0 < d.Ga && 0 < d.Ka && 0 < d.scale || level.t) {
                                f.dirty = r;
                                level.t ? (c = {
                                        T: 0,
                                        U: 0
                                    }, c.X = level.G -
                                    1, c.Y = level.$ - 1) : c = td(d);
                                for (ty = c.U; ty <= c.Y; ty++)
                                    for (tx = c.T; tx <= c.X; tx++) {
                                        var m = tx + ty * level.G + curCfNr * level.G * level.$;
                                        (d = level.g[m]) || (d = level.g[m] = {});
                                        U < Wb && !d.a && (Dd++, d.a = new Image, d.a.onload = Nd(d), d.a.onerror = vd(), d.a.onabort = vd(), d.a.crossOrigin = b.aa, d.a.setAttribute("src", md(h)), level.t && b.checkLoaded.push(d.a), 0 == U && b.divSkin && b.divSkin.ggReLoadedLevels && b.divSkin.ggReLoadedLevels(), U++, b.dirty = l);
                                        if (d.L) {
                                            if (d.Aa) g.bindBuffer(g.ARRAY_BUFFER, d.Aa);
                                            else {
                                                m = 2 * h + 1;
                                                d.Aa = g.createBuffer();
                                                g.bindBuffer(g.ARRAY_BUFFER,
                                                    d.Aa);
                                                var k = [-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1];
                                                k[0] = -2 * a * Math.min((tx + 1) * L, level.width) - ra;
                                                k[1] = -2 * a * Math.min((ty + 1) * L, level.height) - ra;
                                                k[3] = -2 * a * tx * L + ra;
                                                k[4] = k[1];
                                                k[6] = k[3];
                                                k[7] = -2 * a * ty * L + ra;
                                                k[9] = k[0];
                                                k[10] = k[7];
                                                for (i = 0; 12 > i; i++) k[i] = 0 == i % 3 ? m * (k[i] / level.width + 1) : 1 == i % 3 ? m * (k[i] / level.height + 1) : m;
                                                g.bufferData(g.ARRAY_BUFFER, new Float32Array(k), g.STATIC_DRAW)
                                            }
                                            g.vertexAttribPointer(E.Ha, 3, g.FLOAT, r, 0, 0);
                                            g.bindBuffer(g.ARRAY_BUFFER, Sb);
                                            g.vertexAttribPointer(E.Fa, 2, g.FLOAT, r, 0, 0);
                                            g.activeTexture(g.TEXTURE0);
                                            g.bindTexture(g.TEXTURE_2D, d.L);
                                            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
                                            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
                                            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
                                            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
                                            g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, Tb);
                                            g.uniform1i(E.Ua, 0);
                                            g.uniformMatrix4fv(E.Sa, r, la);
                                            g.uniformMatrix4fv(E.sa, r, La);
                                            g.drawElements(g.TRIANGLES, 6, g.UNSIGNED_SHORT, 0)
                                        }
                                        d.ja = f.D
                                    }
                            }
                        h--
                    }
                    for (e = 0; e < D.length; e++) {
                        level = D[e];
                        for (var n in level.g) level.g.hasOwnProperty(n) &&
                            (d = level.g[n], !d.ja && !level.t && (d.L && g.deleteTexture(d.L), d.a = o, delete level.g[n]))
                    }
                    b.S = r
                }
            } else {
                Ta();
                if (z != s.offsetWidth || t != s.offsetHeight) z = parseInt(s.offsetWidth), t = parseInt(s.offsetHeight);
                Jc && (b.initWebGL(0), ya());
                if (g) {
                    g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
                    Ba(La);
                    Yb(b.getVFov(), g.Ja / g.Ia, La);
                    g.uniformMatrix4fv(E.sa, r, La);
                    for (v = 0; 6 > v; v++) Ba(la), Gb(la, -u * Math.PI / 180, [1, 0, 0]), Gb(la, (180 - y) * Math.PI / 180, [0, 1, 0]), 4 > v ? Gb(la, -Math.PI / 2 * v, [0, 1, 0]) : Gb(la, Math.PI / 2 * (5 == v ? 1 : -1), [1, 0, 0]), g.bindBuffer(g.ARRAY_BUFFER,
                        xc), g.vertexAttribPointer(E.Ha, 3, g.FLOAT, r, 0, 0), g.bindBuffer(g.ARRAY_BUFFER, Sb), g.vertexAttribPointer(E.Fa, 2, g.FLOAT, r, 0, 0), 6 <= da.length && da[v].loaded && (g.activeTexture(g.TEXTURE0), g.bindTexture(g.TEXTURE_2D, da[v]), g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, Tb), g.uniform1i(E.Ua, 0), g.uniformMatrix4fv(E.Sa, r, la), g.uniformMatrix4fv(E.sa, r, La), g.drawElements(g.TRIANGLES, 6, g.UNSIGNED_SHORT, 0))
                }
            } else if (Aa)
            if (0 < D.length) {
                Ta();
                n = n = a = r;
                Id++;
                if (z != s.offsetWidth || t != s.offsetHeight) z = parseInt(s.offsetWidth), t = parseInt(s.offsetHeight),
                    s.style[T + "OriginX"] = z / 2 + "px", s.style[T + "OriginY"] = t / 2 + "px", a = l;
                h = Math.round(b.R());
                if (b.fa != h || a) b.fa = h, ja || (s.style[xa] = h + "px", s.style[xa + "Origin"] = "50% 50%");
                b.f.za(y, u);
                Wb = 1;
                if (0 < D.length) {
                    sd();
                    rd();
                    d = 0;
                    a = "";
                    for (curCfNr = 0; 6 > curCfNr; curCfNr++) f = b.f.j[curCfNr], f.D && (d = Math.max(d, f.ta.scale), a = a + curCfNr + ",");
                    d = pd();
                    for (c = D.length - 1; c >= d;) {
                        level = D[c];
                        m = 1;
                        c == D.length - 1 && 0 == ra && (m = L / (L - 2));
                        for (curCfNr = 0; 6 > curCfNr; curCfNr++)
                            if (f = b.f.j[curCfNr], k = f.ta, f.D && k && 0 < k.Ga && 0 < k.Ka && 0 < k.scale || level.t) {
                                f.dirty =
                                    r;
                                var p;
                                level.t ? (p = {
                                    T: 0,
                                    U: 0
                                }, p.X = level.G - 1, p.Y = level.$ - 1) : p = td(k);
                                for (ty = p.U; ty <= p.Y; ty++)
                                    for (tx = p.T; tx <= p.X; tx++) {
                                        var q = tx + ty * level.G + curCfNr * level.G * level.$;
                                        (k = level.g[q]) || (k = level.g[q] = {});
                                        if (!k.b && U < Wb) {
                                            if (0 < unusedTileCanvas.length) {
                                                k.b = unusedTileCanvas.shift();
                                                for (q = s.firstChild; q && q.J && (-1 == q.J || q.J >= c);) q = q.nextSibling;
                                                s.insertBefore(k.b, q);
                                                k.d = k.b.Xa
                                            } else if (Cd < Fd) {
                                                Cd++;
                                                k.b = document.createElement("canvas");
                                                k.b.width = L + 2 * ra;
                                                k.b.height = L + 2 * ra;
                                                k.d = k.b.getContext("2d");
                                                k.b.Xa = k.d;
                                                a += I + "touch-callout: none;";
                                                a += I + "tap-highlight-color: rgba(0,0,0,0);";
                                                k.b.style[T + "Origin"] = "0% 0%";
                                                k.b.style.overflow = "hidden";
                                                k.b.style.position = "absolute";
                                                for (q = s.firstChild; q && q.J && (-1 == q.J || q.J >= c);) q = q.nextSibling;
                                                s.insertBefore(k.b, q)
                                            }
                                            k.b && (Dd++, k.a = new Image, k.a.style[T + "Origin"] = "0% 0%", k.a.style.position = "absolute", k.a.style.overflow = "hidden", k.a.crossOrigin = b.aa, k.b.J = c, n && (k.b.id = "tile" + curCfNr + "_" + c + "___" + ty + "_" + tx), k.a.onload = Md(k), k.a.onerror = ud(k), k.a.onabort = ud(k), k.a.setAttribute("src", md(c)), level.t && b.checkLoaded.push(k.a),
                                                0 == U && b.divSkin && b.divSkin.ggReLoadedLevels && b.divSkin.ggReLoadedLevels(), U++, b.dirty = l)
                                        }
                                        k.b && (a = "", ja ? (a += "translate3d(" + z / 2 + "px," + t / 2 + "px,0px) ", a += " perspective(" + h + "px) ", a += "translate3d(0px,0px," + h + "px) ") : a += "translate3d(" + z / 2 + "px," + t / 2 + "px," + h + "px) ", a += "rotateX(" + Number(u).toFixed(10) + "deg)  rotateY(" + Number(-y).toFixed(10) + "deg) ", a = 4 > curCfNr ? a + ("rotateY(" + -90 * curCfNr + "deg)") : a + ("rotateX(" + (4 == curCfNr ? -90 : 90) + "deg)"), q = 1, pb ? (q = (2 * c + 1) * L / level.width * (Fb / L), q = Gd ? 2 / Math.tan(A * Math.PI / 360) * q :
                                            2 * q, a += " scale(" + q * m * m + ")") : q = 1 / (m * m), a += " translate3d(" + (1 / m * tx * L - ra - level.width / 2) + "px," + (1 / m * ty * L - ra - level.width / 2) + "px," + -level.width * q / 2 + "px)", n && (k.b.id = "rtile_" + Id + "_" + curCfNr + "_" + c + "___" + ty + "_" + tx), f.D && (k.ja = l, k.b ? k.b.style[T] = a : k.a && (k.a.style[T] = a)))
                                    }
                            }
                        c--
                    }
                    for (h = 0; h < D.length; h++)
                        for (e in level = D[h], level.g) level.g.hasOwnProperty(e) && (k = level.g[e], !k.ja && k.b && (level.t ? (a = "translate3d(-10px,-10px,0px) scale(0.001,0.001)", k.b ? (k.b.style[T] = a, n && (k.b.id = "cache")) : k.a && (k.a.style[T] = "")) : (k.d &&
                            (k.d.clear ? k.d.clear() : k.d.clearRect(0, 0, k.d.canvas.width, k.d.canvas.height)), unusedTileCanvas.push(k.b), k.b ? (n && (k.b.id = "unused"), a = "translate3d(-10px,-10px,0px) scale(0.001,0.001)", k.b.style[T] = a, k.b.J = -1) : k.loaded && s.removeChild(k.a), k.b = o, k.a = o, k.d = o, delete level.g[e])));
                    b.S = r
                }
            } else {
                Ta();
                n = r;
                if (z != s.offsetWidth || t != s.offsetHeight) z = parseInt(s.offsetWidth), t = parseInt(s.offsetHeight), s.style[T + "OriginX"] = z / 2 + "px", s.style[T + "OriginY"] = t / 2 + "px", n = l;
                e = Math.round(b.R());
                if ((b.fa != e || n) && !ja) b.fa = e,
                    s.style[xa] = e + "px";
                b.f.za(y, u);
                for (n = 0; 6 > n; n++)
                    if (h = b.f.j[n]) a = "", ja ? (a += "translate3d(" + z / 2 + "px," + t / 2 + "px,0px) ", a += "perspective(" + e + "px) ", a += "translate3d(0px,0px," + e + "px) ") : a += "translate3d(" + z / 2 + "px," + t / 2 + "px," + e + "px) ", a += "rotateX(" + Number(u).toFixed(10) + "deg)  rotateY(" + Number(-y).toFixed(10) + "deg) ", h.Pa && (a += h.Pa, h.D || (a = "translate3d(-10px,-10px,0px) scale(0.001,0.001)"), h.style[T] = a)
            } else if (wb) {
            Ta();
            ka && (h = ka.getContext("2d"));
            if (z != s.offsetWidth || t != s.offsetHeight) z = parseInt(s.offsetWidth),
                t = parseInt(s.offsetHeight);
            h && (e = h.canvas.width / 2, n = h.canvas.height / 2, a = h.createRadialGradient(e, n, 5, e, n, Math.max(e, n)), a.addColorStop(0, "#333"), a.addColorStop(1, "#fff"), h.rect(0, 0, h.canvas.width, h.canvas.height), h.fillStyle = a, h.fill(), h.fillStyle = "#f00", h.font = "20px Helvetica", h.textAlign = "center", h.fillText("Pan: " + y.toFixed(1), e, n - 30), h.fillText("Tilt: " + u.toFixed(1), e, n), h.fillText("Fov: " + A.toFixed(1), e, n + 30))
        }
        Zb()
    };
    var ja = r,
        pb = r;
    b.setRenderFlags = function(a) {
        a = Math.round(a);
        ja = a & 1;
        pb = a & 2;
        Vb =
            a & 4;
        4096 <= a && (Aa = a & 4096, ta = a & 8192, wb = a & 32768)
    };
    b.getRenderFlags = function() {
        var a = 0;
        ja && (a |= 1);
        pb && (a |= 2);
        Vb && (a |= 4);
        Aa && (a |= 4096);
        ta && (a |= 8192);
        wb && (a |= 32768);
        return a
    };
    var Id = 1,
        E;
    b.initWebGL = function(a) {
        Jc = r;
        try {
            if (za = a ? a : document.createElement("canvas"), za.width = 100, za.height = 100, s.appendChild(za), (g = za.getContext("webgl")) || (g = za.getContext("experimental-webgl")), g) {
                g.Ja = 500;
                g.Ia = 500;
                g.clearColor(0, 0, 0, 0);
                if (ob && 6 < ob.length) {
                    var b = parseInt(ob);
                    g.clearColor((b >> 16 & 255) / 255, (b >> 8 & 255) / 255, (b >> 0 &
                        255) / 255, 1)
                }
                g.enable(g.DEPTH_TEST);
                g.viewport(0, 0, 500, 500);
                g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
                var c = g.createShader(g.FRAGMENT_SHADER);
                g.shaderSource(c, "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nvoid main(void) {\n\tgl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n}\n");
                g.compileShader(c);
                g.getShaderParameter(c, g.COMPILE_STATUS) || (alert(g.getShaderInfoLog(c)),
                    c = o);
                var f = g.createShader(g.VERTEX_SHADER);
                g.shaderSource(f, "attribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nvarying vec2 vTextureCoord;\nvoid main(void) {\n\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n\tvTextureCoord = aTextureCoord;\n}\n");
                g.compileShader(f);
                g.getShaderParameter(f, g.COMPILE_STATUS) || (alert(g.getShaderInfoLog(f)), f = o);
                E = g.createProgram();
                g.attachShader(E, f);
                g.attachShader(E, c);
                g.linkProgram(E);
                g.getProgramParameter(E, g.LINK_STATUS) || alert("Could not initialise shaders");
                g.useProgram(E);
                E.Ha = g.getAttribLocation(E, "aVertexPosition");
                g.enableVertexAttribArray(E.Ha);
                E.Fa = g.getAttribLocation(E, "aTextureCoord");
                g.enableVertexAttribArray(E.Fa);
                E.sa = g.getUniformLocation(E, "uPMatrix");
                E.Sa = g.getUniformLocation(E, "uMVMatrix");
                E.Ua = g.getUniformLocation(E, "uSampler");
                kd(Eb);
                ld()
            }
        } catch (e) {}
        g ? ta = l : alert("Could not initialise WebGL!")
    };
    var da = [],
        la = new glMatrixArrayType(16),
        La = new glMatrixArrayType(16),
        xc, Sb, Tb;
    b.getPan = function() {
        return y
    };
    b.getPanDest = function() {
        return fc
    };
    b.getPanN = function() {
        for (var a = y; - 180 > a;) a += 360;
        for (; 180 < a;) a -= 360;
        return a
    };
    b.getPanNorth = function() {
        for (var a = y - Gc; - 180 > a;) a += 360;
        for (; 180 < a;) a -= 360;
        return a
    };
    b.setPan = function(a) {
        K();
        isNaN(a) || (y = Number(a));
        b.update()
    };
    b.changePan = function(a, d) {
        b.setPan(b.getPan() + a);
        d && (F = a)
    };
    b.changePanLog = function(a, d) {
        b.changePan(a * fa(), d)
    };
    b.getTilt = function() {
        return u
    };
    b.getTiltDest = function() {
        return gc
    };
    b.setTilt = function(a) {
        K();
        isNaN(a) ||
            (u = Number(a));
        b.update()
    };
    b.changeTilt = function(a, d) {
        b.setTilt(b.getTilt() + a);
        d && (O = a)
    };
    b.changeTiltLog = function(a, d) {
        b.changeTilt(a * fa(), d)
    };
    b.getFov = function() {
        return A
    };
    b.getFovDest = function() {
        return hc
    };
    b.setFov = function(a) {
        K();
        if (!isNaN(a) && 0 < a && 180 > a) {
            var d = A;
            A = Number(a);
            Ta();
            d != A && b.update()
        }
    };
    b.changeFov = function(a, d) {
        b.setFov(b.getFov() + a);
        d && (N = a)
    };
    b.changeFovLog = function(a, d) {
        if (!isNaN(a)) {
            var c;
            c = a / 90 * Math.cos(A * Math.PI / 360);
            c = A * Math.exp(c);
            b.setFov(c);
            d && (N = a)
        }
    };
    b.setPanTilt = function(a,
        d) {
        K();
        isNaN(a) || (y = a);
        isNaN(d) || (u = d);
        b.update()
    };
    b.setPanTiltFov = function(a, d, c) {
        K();
        isNaN(a) || (y = a);
        isNaN(d) || (u = d);
        !isNaN(c) && 0 < c && 180 > c && (A = c);
        b.update()
    };
    b.setDefaultView = function() {
        b.setPanTiltFov(Fc, Hc, Kb)
    };
    b.setLocked = function(a) {
        b.setLockedMouse(a);
        b.setLockedWheel(a);
        b.setLockedKeyboard(a)
    };
    b.setLockedMouse = function(a) {
        ca = a
    };
    b.setLockedKeyboard = function(a) {
        Nb = a
    };
    b.setLockedWheel = function(a) {
        uc = a
    };
    b.moveTo = function(a, b, c, f) {
        K();
        xb = l;
        var e = a.toString().split("/");
        1 < e.length && (a = Number(e[0]),
            f = b, b = Number(e[1]), 2 < e.length && (c = Number(e[2])));
        fc = isNaN(a) ? y : a;
        gc = isNaN(b) ? u : b;
        hc = !isNaN(c) && 0 < c && 180 > c ? c : A;
        Oc = !isNaN(f) && 0 < f ? f : 1
    };
    b.moveToDefaultView = function(a) {
        b.moveTo(Fc, Hc, Kb, a)
    };
    var Pb = -1;
    b.isTouching = function() {
        return b.m != o || 0 <= Q
    };
    var Sa, Ob = 1;
    K();
    var bc = 0,
        ec = 0,
        aa;
    b.Wa = function() {
        var a;
        a = S;
        b.control = a;
        Va();
        setTimeout(function() {
            Ca()
        }, 10);
        setTimeout(function() {
            Wa()
        }, 200);
        setTimeout(function() {
            ya();
            b.updatePanorama()
        }, 10);
        a.addEventListener ? (a.addEventListener("touchstart", Ld, r),
          a.addEventListener("touchmove", Kd, r),
          a.addEventListener("touchend", eb, r),
          a.addEventListener("touchcancel", db, r),
          a.addEventListener("MSPointerDown", cb, r),
          a.addEventListener("MSGestureStart", Na, r),
          a.addEventListener("MSGestureEnd", Ma, r),
          a.addEventListener("MSGestureChange", ab, r),
          a.addEventListener("gesturestart", Na, r),
          a.addEventListener("gesturechange", bb, r),
          a.addEventListener("gestureend", Ma, r),
          a.addEventListener("mousedown", id, r),
          a.addEventListener("mousemove", hd, r),
          document.addEventListener("mouseup", ed, r),
          a.addEventListener("mousedblclick", b.toggleFullscreen, r),
            a.addEventListener("mousewheel", tc, r), a.addEventListener("DOMMouseScroll", tc, r), document.addEventListener("keydown", $a, r), document.addEventListener("keyup", Za, r), window.addEventListener("orientationchange", Va, r), window.addEventListener("resize", ya, r), window.addEventListener("blur", Ya, r), b.c.addEventListener("webkitfullscreenchange", Da, r), document.addEventListener("mozfullscreenchange", Da, r), window.addEventListener("webkitfullscreenchange", Da, r), document.addEventListener("MSFullscreenChange",
            Da, r)) : a.attachEvent && (a.attachEvent("onmousedown", id),
              a.attachEvent("onmousemove", hd),
              document.attachEvent("onmouseup", ed),
              a.attachEvent("onmousedblclick", b.toggleFullscreen),
              a.attachEvent("onmousewheel", tc),
              document.attachEvent("onkeydown", $a),
              document.attachEvent("onkeyup", Za),
              window.attachEvent("onresize", ya),
              window.attachEvent("onblur", Ya)
            );
        a.oncontextmenu = function(a) {
            void 0 === a && (a = window.event);
            return !a.ctrlKey && (a = "<<L>>", "U" != a.charAt(2)) ? (ma(), r) : l
        }
    };
    b.addHotspotElements = function() {
        for (var a =
                0; a < J.length; a++)
            if ("point" == J[a].type && (J[a].obj = b.skinObj && b.skinObj.addSkinHotspot ? new b.skinObj.addSkinHotspot(J[a]) : new Od(this, J[a]), J[a].obj.__div.style.left = "-1000px", J[a].obj.__div.style.top = "-1000px", J[a].obj && J[a].obj.__div)) {
                var d = S.firstChild;
                d ? S.insertBefore(J[a].obj.__div, d) : S.appendChild(J[a].obj.__div)
            }
    };
    b.isPlaying = function(a) {
        return "_main" == a ? l : (a = B(a)) ? !a.obj.ended && !a.obj.paused : r
    };
    b.playSound = function(a, b) {
        var c = B(a);
        c && (c.obj.r = b && !isNaN(Number(b)) ? Number(b) - 1 : c.loop - 1, -1 ==
            c.obj.r && (c.obj.r = 1E7), c.obj.play())
    };
    b.playPauseSound = function(a, d) {
        b.isPlaying(a) ? b.pauseSound(a) : b.playSound(a, d)
    };
    b.pauseSound = function(a) {
        if ("_main" == a) {
            for (a = 0; a < C.length; a++) C[a].obj.pause();
            for (a = 0; a < x.length; a++) x[a].obj.pause()
        } else(a = B(a)) && a.obj.pause()
    };
    b.activateSound = function(a, b) {
        var c = B(a);
        c && (0 == b || 1 == b ? c.V && c.V(1 == b) : 2 == b && c.o && c.o())
    };
    b.stopSound = function(a) {
        if ("_main" == a) {
            for (a = 0; a < C.length; a++) C[a].obj.pause(), C[a].obj.currentTime = 0;
            for (a = 0; a < x.length; a++) x[a].obj.pause(), x[a].obj.currentTime =
                0
        } else if (a = B(a)) a.obj.pause(), a.obj.currentTime = 0
    };
    b.setVolume = function(a, b) {
        var c = Number(b);
        1 < c && (c = 1);
        0 > c && (c = 0);
        if ("_main" == a) {
            Y = c;
            for (c = 0; c < C.length; c++) C[c].obj.volume = C[c].i * Y;
            for (c = 0; c < x.length; c++) x[c].obj.volume = x[c].i * Y
        } else {
            var f = B(a);
            f && (f.i = c, f.obj.volume = c * Y)
        }
    };
    b.changeVolume = function(a, b) {
        if ("_main" == a) {
            var c = Y,
                c = c + Number(b);
            1 < c && (c = 1);
            0 > c && (c = 0);
            Y = c;
            for (c = 0; c < C.length; c++) C[c].obj.volume = C[c].i * Y;
            for (c = 0; c < x.length; c++) x[c].obj.volume = x[c].i * Y
        } else {
            var f = B(a);
            f && (c = f.i, c += Number(b),
                1 < c && (c = 1), 0 > c && (c = 0), f.i = c, f.obj.volume = c * Y)
        }
    };
    b.removeHotspots = function() {
        for (var a; 0 < J.length;) a = J.pop(), a.obj && (S.removeChild(a.obj.__div), delete a.obj), a.obj = o
    };
    b.setFullscreen = function(a) {
        var d = b.isFullscreen != a;
        b.isFullscreen != a && (b.isFullscreen = a, b.update(100));
        if (b.isFullscreen) {
            if (Vb) try {
                b.c.webkitRequestFullScreen ? b.c.webkitRequestFullScreen() : b.c.mozRequestFullScreen ? b.c.mozRequestFullScreen() : b.c.msRequestFullscreen ? b.c.msRequestFullscreen() : b.c.requestFullScreen ? b.c.requestFullScreen() :
                    b.c.requestFullscreen && b.c.requestFullscreen()
            } catch (c) {}
            b.c.style.position = "absolute";
            a = Bb();
            b.c.style.left = window.pageXOffset - a.x + Z + "px";
            b.c.style.top = window.pageYOffset - a.y + ba + "px";
            document.body.style.overflow = "hidden";
            d && b.divSkin && b.divSkin.ggEnterFullscreen && b.divSkin.ggEnterFullscreen()
        } else {
            if (Vb) try {
                document.webkitIsFullScreen ? document.webkitCancelFullScreen() : document.mozFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.fullScreen &&
                    (document.cancelFullScreen ? document.cancelFullScreen() : document.exitFullscreen && document.exitFullscreen())
            } catch (f) {}
            b.c.style.position = "relative";
            b.c.style.left = "0px";
            b.c.style.top = "0px";
            document.body.style.overflow = "";
            d && b.divSkin && b.divSkin.ggExitFullscreen && b.divSkin.ggExitFullscreen()
        }
        ya()
    };
    b.toggleFullscreen = function() {
        b.setFullscreen(!b.isFullscreen)
    };
    b.enterFullscreen = function() {
        b.setFullscreen(l)
    };
    b.exitFullscreen = function() {
        b.setFullscreen(r)
    };
    b.startAutorotate = function(a, b, c) {
        ga = yb = l;
        ib =
            (new Date).getTime();
        a && 0 != a && (Qa = a);
        b && (kc = b);
        c && (Jb = c)
    };
    b.stopAutorotate = function() {
        yb = ga = r
    };
    b.toggleAutorotate = function() {
        (ga = yb = !ga) && (ib = (new Date).getTime())
    };
    b.createLayers = function(a) {
        var d = r,
            d = r;
        b.ca = document.getElementById(a);
        b.ca ? (b.ca.innerHTML = "", b.c = document.createElement("div"), d && b.c.setAttribute("id", "viewport"), a = "top:  0px;left: 0px;position:relative;-ms-touch-action: none;" + (I + "user-select: none;"), a += I + "touch-callout: none;", a += I + "tap-highlight-color: rgba(0,0,0,0);", b.c.setAttribute("style",
                a), b.ca.appendChild(b.c), s = document.createElement("div"), a = "top:  0px;left: 0px;width:  100px;height: 100px;overflow: hidden;position:absolute;" + (I + "user-select: none;"), a += I + "touch-callout: none;", a += I + "tap-highlight-color: rgba(0,0,0,0);", d && s.setAttribute("id", "viewer"), s.setAttribute("style", a), b.c.appendChild(s), S = document.createElement("div"), d && S.setAttribute("id", "hotspots"), a = "top:  0px;left: 0px;width:  100px;height: 100px;overflow: hidden;position:absolute;z-index: 1000;", Pd && (a += "background-image: url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7);"),
            a += I + "user-select: none;", a += I + "touch-callout: none;", a += I + "tap-highlight-color: rgba(0,0,0,0);", S.setAttribute("style", a), b.c.appendChild(S), $ = document.createElement("canvas"), d && $.setAttribute("id", "hotspotcanvas"), a = "top:  0px;left: 0px;width:  100px;height: 100px;overflow: hidden;position:absolute;z-index: 900;" + (I + "user-select: none;"), a += I + "pointer-events: none;", a += I + "touch-callout: none;", a += I + "tap-highlight-color: rgba(0,0,0,0);", $.setAttribute("style", a), b.c.appendChild($), M = document.createElement("div"),
            d && M.setAttribute("id", "hotspottext"), M.setAttribute("style", "top:  0px;left: 0px;position:absolute;padding: 3px;visibility: hidden;z-index: 1100;"), M.innerHTML = " Hotspot text!", b.c.appendChild(M), b.divSkin = S) : alert("container not found!")
    };
    b.Ma = function(a) {
        var d, c, f, e = 128;
        ob && (s.style.backgroundColor = ob.replace("0x", "#"));
        a ? (e = Fb, Eb = 1) : mb > e && (e = mb);
        for (f = 0; 6 > f; f++) {
            a ? (c = {}, c.width = Fb, c.height = Fb) : (c = document.createElement("canvas"), c.width = mb, c.height = mb, c.d = c.getContext("2d"));
            d = "position:absolute;";
            d += "left: 0px;";
            d += "top: 0px;";
            d += "width: " + e + "px;";
            d += "height: " + e + "px;";
            a && (d += "outline: 1px solid transparent;");
            d += I + "transform-origin: 0% 0%;";
            d += "-webkit-user-select: none;";
            d += I + "transform: ";
            var g;
            g = "";
            var h = 1;
            pb && (h = 100);
            g = 4 > f ? g + ("rotateY(" + -90 * f + "deg)") : g + ("rotateX(" + (4 == f ? -90 : 90) + "deg)");
            pb && (g += " scale(" + h + ")");
            g += " translate3d(" + -e / 2 + "px," + -e / 2 + "px," + -e * h / (2 * Eb) + "px)";
            d += g + ";";
            c.Pa = g;
            a || (c.setAttribute("style", d), s.insertBefore(c, s.firstChild));
            b.f.j[f] = c
        }
        if (!a) {
            for (f = 0; 6 > f; f++) c = b.f.j[f],
                "" != lb[f] && (c.A = new Image, c.A.onload = G(c), c.A.crossOrigin = b.aa, c.A.setAttribute("src", na(lb[f])), b.checkLoaded.push(c.A));
            for (f = 0; 6 > f; f++) c = b.f.j[f], c.loaded = r, c.a = new Image, c.a.onload = G(c), c.a.crossOrigin = b.aa, c.a.setAttribute("src", na(Ub[f])), b.checkLoaded.push(c.a)
        }
    };
    b.setOverlayOpacity = function(a) {
        var d;
        if (Aa)
            for (d = 0; 6 > d; d++) b.f.la[d] && b.f.la[d].style && (b.f.la[d].style.opacity = a)
    };
    b.removePanorama = function() {
        var a;
        if (Aa) {
            for (a = 0; a < b.f.j.length; a++) b.f.j[a].setAttribute && (b.f.j[a].setAttribute("src",
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYBgeACDAAADIAAE3iTbkAAAAAElFTkSuQmCC"), s.removeChild(b.f.j[a]));
            if (D) {
                for (a = 0; a < D.length; a++) {
                    var d = D[a],
                        c;
                    for (c in d.g)
                        if (d.g.hasOwnProperty(c)) {
                            var f = d.g[c];
                            f.ja = r;
                            f.b && (f.d && (f.d.clear ? f.d.clear() : f.d.clearRect(0, 0, f.d.canvas.width, f.d.canvas.height)), unusedTileCanvas.push(f.b));
                            f.a && delete f.a;
                            f.L && g.deleteTexture(f.L);
                            f.d = o;
                            f.b = o;
                            f.a = o
                        }
                    delete d.g
                }
                delete D;
                D = o
            }
            b.f.j = [];
            b.f.la = []
        }
        if (g && da)
            for (; 0 < da.length;) c = da.pop(), c.eb = l, g.deleteTexture(c);
        for (a = 0; a < x.length; a++) s.removeChild(x[a].obj);
        for (a = 0; a < ea.length; a++) s.removeChild(ea[a].obj);
        c = [];
        for (a = 0; a < C.length; a++)
            if (d = C[a], 0 == d.mode || 1 == d.mode || d.ib) c.push(d);
            else {
                try {
                    d.obj.pause()
                } catch (e) {}
                b.c.removeChild(d.obj)
            }
        C = c;
        x = [];
        ea = []
    };
    b.getScreenResolution = function() {
        var a = 1,
            b = -1 != navigator.userAgent.indexOf("Mac");
        window.devicePixelRatio && b && (a = window.devicePixelRatio);
        return {
            w: screen.width * a,
            h: screen.height * a
        }
    };
    b.getMaxScreenResolution = function() {
        var a = b.getScreenResolution();
        return a.w > a.h ? a.w : a.h
    };
    b.readConfigString = function(a, d) {
        window.DOMParser ? (parser = new DOMParser, xmlDoc = parser.parseFromString(a, "text/xml")) : (xmlDoc = new ActiveXObject("Microsoft.XMLDOM"), xmlDoc.async = "false", xmlDoc.loadXML(a));
        b.readConfigXml(xmlDoc, d)
    };
    b.readConfigUrl = function(a, d, c) {
        try {
            var f;
            f = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
            f.open("GET", a, r);
            f.send(o);
            if (f.responseXML) {
                var e = a.lastIndexOf("/");
                0 <= e && (Cb = a.substr(0, e + 1));
                2 <= arguments.length && d != o && (Cb = d);
                b.readConfigString(f.responseText, c)
            } else alert("Error loading panorama XML")
        } catch (g) {
            alert("Error:" + g)
        }
    };
    var Xb = l;
    b.getCurrentNode = function() {
        return Hb
    };
    b.readConfigXml = function(a, d) {
        var c = a.firstChild;
        nb = [];
        sa = [];
        if ("tour" == c.nodeName) {
            var f = "",
                e;
            (e = c.getAttributeNode("start")) && (f = e.nodeValue.toString());
            "" != b.startNode && (f = b.startNode, b.startNode = "");
            for (c = c.firstChild; c;) {
                e = "";
                if ("panorama" == c.nodeName && (e = c.getAttributeNode("id"))) e =
                    e.nodeValue.toString(), "" == f && (f = e), nb[e] = c, sa.push(e);
                c = c.nextSibling
            }
            b.Ca(nb[f], d);
            p("{" + f + "}");
            b.Ba = l
        } else b.Ba = r, b.Ca(c, d), p(""), sa.push("")
    };
    b.Ca = function(a, d) {
        b.removeHotspots();
        b.hotspot = b.emptyHotspot;
        b.removePanorama();
        b.fa = 0;
        for (var c = a.firstChild, f, e, h, p = 0; c;) {
            if ("view" == c.nodeName) {
                (e = c.getAttributeNode("fovmode")) && (Ic = Number(e.nodeValue));
                e = c.getAttributeNode("pannorth");
                Gc = 1 * (e ? e.nodeValue : 0);
                for (f = c.firstChild; f;) "start" == f.nodeName && (e = f.getAttributeNode("pan"), Fc = y = Number(e ? e.nodeValue :
                    0), e = f.getAttributeNode("tilt"), Hc = u = Number(e ? e.nodeValue : 0), e = f.getAttributeNode("fov"), Kb = A = Number(e ? e.nodeValue : 70)), "min" == f.nodeName && (e = f.getAttributeNode("pan"), hb = 1 * (e ? e.nodeValue : 0), e = f.getAttributeNode("tilt"), Ka = 1 * (e ? e.nodeValue : -90), e = f.getAttributeNode("fov"), ia = 1 * (e ? e.nodeValue : 5), 1.0E-20 > ia && (ia = 1.0E-20), e = f.getAttributeNode("fovpixel"), zc = 1 * (e ? e.nodeValue : 0)), "max" == f.nodeName && (e = f.getAttributeNode("pan"), gb = 1 * (e ? e.nodeValue : 0), e = f.getAttributeNode("tilt"), Ja = 1 * (e ? e.nodeValue : 90),
                    e = f.getAttributeNode("fov"), qa = 1 * (e ? e.nodeValue : 120), 180 <= qa && (qa = 179.9)), f = f.nextSibling
            }
            if ("autorotate" == c.nodeName && ((e = c.getAttributeNode("speed")) && (Qa = 1 * e.nodeValue), (e = c.getAttributeNode("delay")) && (kc = 1 * e.nodeValue), (e = c.getAttributeNode("returntohorizon")) && (Jb = 1 * e.nodeValue), (e = c.getAttributeNode("nodedelay")) && (jc = 1 * e.nodeValue), (e = c.getAttributeNode("noderandom")) && (Pc = 1 == e.nodeValue), Xb && (ga = yb = l, ib = (new Date).getTime()), e = c.getAttributeNode("startloaded")))(lc = 1 == e.nodeValue) && (ga = r);
            "input" == c.nodeName && (h || (h = c));
            if (h)
                for (f = 0; 6 > f; f++) e = h.getAttributeNode("prev" + f + "url"), lb[f] = e ? new String(e.nodeValue) : "";
            "altinput" == c.nodeName && (f = 0, (e = c.getAttributeNode("screensize")) && (f = 1 * e.nodeValue), 0 < f && f <= b.getMaxScreenResolution() && f > p && (p = f, h = c));
            if ("control" == c.nodeName && Xb) {
                (e = c.getAttributeNode("simulatemass")) && (dc = 1 == e.nodeValue);
                (e = c.getAttributeNode("locked")) && (ca = 1 == e.nodeValue);
                e && (Nb = 1 == e.nodeValue);
                (e = c.getAttributeNode("lockedmouse")) && (ca = 1 == e.nodeValue);
                (e = c.getAttributeNode("lockedkeyboard")) &&
                (Nb = 1 == e.nodeValue);
                (e = c.getAttributeNode("lockedwheel")) && (uc = 1 == e.nodeValue);
                (e = c.getAttributeNode("invertwheel")) && (cd = 1 == e.nodeValue);
                (e = c.getAttributeNode("speedwheel")) && (dd = 1 * e.nodeValue);
                (e = c.getAttributeNode("invertcontrol")) && (Oa = 1 == e.nodeValue);
                if (e = c.getAttributeNode("sensitivity")) fb = 1 * e.nodeValue, 1 > fb && (fb = 1);
                (e = c.getAttributeNode("dblclickfullscreen")) && (pc = 1 == e.nodeValue)
            }
            "overlay" == c.nodeName && ((e = c.getAttributeNode("blendspeed")) && (jb = 1 * e.nodeValue), (e = c.getAttributeNode("auto")) &&
                (Qc = 1 == e.nodeValue), (e = c.getAttributeNode("delay")) && (Rc = 1 * e.nodeValue));
            "userdata" == c.nodeName && (b.userdata = q(c));
            if ("hotspots" == c.nodeName)
                for (f = c.firstChild; f;) {
                    if ("label" == f.nodeName) {
                        var k = Qb;
                        if (e = f.getAttributeNode("enabled")) k.enabled = 1 == e.nodeValue;
                        if (e = f.getAttributeNode("width")) k.width = 1 * e.nodeValue;
                        if (e = f.getAttributeNode("height")) k.height = 1 * e.nodeValue;
                        if (e = f.getAttributeNode("textcolor")) k.Ea = 1 * e.nodeValue;
                        if (e = f.getAttributeNode("textalpha")) k.Da = 1 * e.nodeValue;
                        if (e = f.getAttributeNode("background")) k.background =
                            1 == e.nodeValue;
                        if (e = f.getAttributeNode("backgroundalpha")) k.N = 1 * e.nodeValue;
                        if (e = f.getAttributeNode("backgroundcolor")) k.O = 1 * e.nodeValue;
                        if (e = f.getAttributeNode("border")) k.ya = 1 * e.nodeValue;
                        if (e = f.getAttributeNode("bordercolor")) k.Q = 1 * e.nodeValue;
                        if (e = f.getAttributeNode("borderalpha")) k.P = 1 * e.nodeValue;
                        if (e = f.getAttributeNode("borderradius")) k.xa = 1 * e.nodeValue;
                        if (e = f.getAttributeNode("wordwrap")) k.wordwrap = 1 == e.nodeValue
                    }
                    "polystyle" == f.nodeName && ((e = f.getAttributeNode("mode")) && (R = 1 * e.nodeValue), (e = f.getAttributeNode("bordercolor")) && (Ac = 1 * e.nodeValue), (e = f.getAttributeNode("backgroundcolor")) && (Cc = 1 * e.nodeValue), (e = f.getAttributeNode("borderalpha")) && (Bc = 1 * e.nodeValue), (e = f.getAttributeNode("backgroundalpha")) && (Dc = 1 * e.nodeValue));
                    "hotspot" == f.nodeName && (k = {
                            type: "point",
                            pan: 0,
                            tilt: 0,
                            url: "",
                            target: "",
                            id: "",
                            skinid: "",
                            w: 100,
                            h: 20,
                            wordwrap: r,
                            obj: o,
                            ia: o
                        }, e = f.getAttributeNode("pan"), k.pan = 1 * (e ? e.nodeValue : 0), e = f.getAttributeNode("tilt"), k.tilt = 1 * (e ? e.nodeValue : 0), (e = f.getAttributeNode("url")) &&
                        (k.url = e.nodeValue.toString()), (e = f.getAttributeNode("target")) && (k.target = e.nodeValue.toString()), (e = f.getAttributeNode("title")) && (k.title = e.nodeValue.toString()), (e = f.getAttributeNode("id")) && (k.id = e.nodeValue.toString()), (e = f.getAttributeNode("skinid")) && (k.skinid = e.nodeValue.toString()), (e = c.getAttributeNode("width")) && (k.w = e.nodeValue.toString()), (e = c.getAttributeNode("height")) && (k.h = e.nodeValue.toString()), (e = c.getAttributeNode("wordwrap")) && (k.wordwrap = 1 == e.nodeValue), J.push(k));
                    if ("polyhotspot" ==
                        f.nodeName) {
                        k = {
                            type: "poly",
                            url: "",
                            target: "",
                            id: "",
                            skinid: "",
                            w: 100,
                            h: 20,
                            wordwrap: r,
                            obj: o,
                            ia: o,
                            p: 0,
                            B: 0
                        };
                        (e = f.getAttributeNode("url")) && (k.url = e.nodeValue.toString());
                        (e = f.getAttributeNode("target")) && (k.target = e.nodeValue.toString());
                        (e = f.getAttributeNode("title")) && (k.title = e.nodeValue.toString());
                        (e = f.getAttributeNode("id")) && (k.id = e.nodeValue.toString());
                        k.Q = Ac;
                        k.O = Cc;
                        k.P = Bc;
                        k.N = Dc;
                        if (e = f.getAttributeNode("bordercolor")) k.Q = 1 * e.nodeValue;
                        if (e = f.getAttributeNode("backgroundcolor")) k.O = 1 * e.nodeValue;
                        if (e = f.getAttributeNode("borderalpha")) k.P = 1 * e.nodeValue;
                        if (e = f.getAttributeNode("backgroundalpha")) k.N = 1 * e.nodeValue;
                        k.ia = [];
                        for (var n = f.firstChild; n;) {
                            if ("vertex" == n.nodeName) {
                                var t = {
                                    pan: 0,
                                    tilt: 0
                                };
                                e = n.getAttributeNode("pan");
                                t.pan = 1 * (e ? e.nodeValue : 0);
                                e = n.getAttributeNode("tilt");
                                t.tilt = 1 * (e ? e.nodeValue : 0);
                                k.ia.push(t)
                            }
                            n = n.nextSibling
                        }
                        J.push(k)
                    }
                    f = f.nextSibling
                }
            if ("sounds" == c.nodeName || "media" == c.nodeName)
                for (f = c.firstChild; f;) {
                    if ("sound" == f.nodeName) {
                        n = {
                            id: "",
                            url: "",
                            loop: 0,
                            i: 1,
                            ba: 0,
                            mode: 1,
                            field: 10,
                            pan: 0,
                            tilt: 0,
                            s: 0,
                            M: 0,
                            url: []
                        };
                        if (e = f.getAttributeNode("id")) n.id = e.nodeValue.toString();
                        (e = f.getAttributeNode("url")) && n.url.push(e.nodeValue.toString());
                        if (e = f.getAttributeNode("level")) n.i = Number(e.nodeValue);
                        if (e = f.getAttributeNode("loop")) n.loop = Number(e.nodeValue);
                        if (e = f.getAttributeNode("mode")) n.mode = Number(e.nodeValue);
                        if (e = f.getAttributeNode("field")) n.field = Number(e.nodeValue);
                        if (e = f.getAttributeNode("ambientlevel")) n.ba = Number(e.nodeValue);
                        if (e = f.getAttributeNode("pan")) n.pan = Number(e.nodeValue);
                        if (e = f.getAttributeNode("tilt")) n.tilt = Number(e.nodeValue);
                        if (e = f.getAttributeNode("pansize")) n.s = Number(e.nodeValue);
                        if (e = f.getAttributeNode("tiltsize")) n.M = Number(e.nodeValue);
                        for (k = f.firstChild; k;) "source" == k.nodeName && (e = k.getAttributeNode("url")) && n.url.push(e.nodeValue.toString()), k = k.nextSibling;
                        Ua(n)
                    }
                    if ("video" == f.nodeName) {
                        n = {
                            id: "",
                            url: "",
                            poster: "",
                            loop: 0,
                            i: 1,
                            ba: 0,
                            mode: 1,
                            field: 10,
                            pan: 0,
                            tilt: 0,
                            s: 0,
                            M: 0,
                            k: 0,
                            l: 0,
                            ga: 0,
                            I: 50,
                            u: 0,
                            url: []
                        };
                        if (e = f.getAttributeNode("id")) n.id = e.nodeValue.toString();
                        (e = f.getAttributeNode("url")) && n.url.push(e.nodeValue.toString());
                        if (e = f.getAttributeNode("poster")) n.poster = "" + e.nodeValue;
                        if (e = f.getAttributeNode("level")) n.i = Number(e.nodeValue);
                        if (e = f.getAttributeNode("loop")) n.loop = Number(e.nodeValue);
                        if (e = f.getAttributeNode("mode")) n.mode = Number(e.nodeValue);
                        if (e = f.getAttributeNode("field")) n.field = Number(e.nodeValue);
                        if (e = f.getAttributeNode("ambientlevel")) n.ba = Number(e.nodeValue);
                        if (e = f.getAttributeNode("pan")) n.pan = Number(e.nodeValue);
                        if (e = f.getAttributeNode("tilt")) n.tilt =
                            Number(e.nodeValue);
                        if (e = f.getAttributeNode("pansize")) n.s = Number(e.nodeValue);
                        if (e = f.getAttributeNode("tiltsize")) n.M = Number(e.nodeValue);
                        if (e = f.getAttributeNode("rotx")) n.k = Number(e.nodeValue);
                        if (e = f.getAttributeNode("roty")) n.l = Number(e.nodeValue);
                        if (e = f.getAttributeNode("rotz")) n.ga = Number(e.nodeValue);
                        if (e = f.getAttributeNode("fov")) n.I = Number(e.nodeValue);
                        if (e = f.getAttributeNode("width")) n.z = Number(e.nodeValue);
                        if (e = f.getAttributeNode("height")) n.C = Number(e.nodeValue);
                        e = f.getAttributeNode("stretch");
                        n.K = e ? Number(e.nodeValue) : 1;
                        if (e = f.getAttributeNode("clickmode")) n.u = Number(e.nodeValue);
                        for (k = f.firstChild; k;) "source" == k.nodeName && (e = k.getAttributeNode("url")) && n.url.push(e.nodeValue.toString()), k = k.nextSibling;
                        X(n)
                    }
                    if ("image" == f.nodeName) {
                        n = {
                            id: "",
                            url: "",
                            loop: 0,
                            i: 1,
                            ba: 0,
                            mode: 1,
                            field: 10,
                            pan: 0,
                            tilt: 0,
                            s: 0,
                            M: 0,
                            k: 0,
                            l: 0,
                            ga: 0,
                            I: 50,
                            u: 0
                        };
                        if (e = f.getAttributeNode("id")) n.id = e.nodeValue.toString();
                        if (e = f.getAttributeNode("url")) n.url = e.nodeValue.toString();
                        if (e = f.getAttributeNode("pan")) n.pan = Number(e.nodeValue);
                        if (e = f.getAttributeNode("tilt")) n.tilt = Number(e.nodeValue);
                        if (e = f.getAttributeNode("rotx")) n.k = Number(e.nodeValue);
                        if (e = f.getAttributeNode("roty")) n.l = Number(e.nodeValue);
                        if (e = f.getAttributeNode("rotz")) n.ga = Number(e.nodeValue);
                        if (e = f.getAttributeNode("fov")) n.I = Number(e.nodeValue);
                        if (e = f.getAttributeNode("width")) n.z = Number(e.nodeValue);
                        if (e = f.getAttributeNode("height")) n.C = Number(e.nodeValue);
                        e = f.getAttributeNode("stretch");
                        n.K = e ? Number(e.nodeValue) : 1;
                        if (e = f.getAttributeNode("clickmode")) n.u = Number(e.nodeValue);
                        for (k = f.firstChild; k;) {
                            if ("source" == k.nodeName && (e = k.getAttributeNode("url"))) n.url = e.nodeValue.toString();
                            k = k.nextSibling
                        }
                        m(n)
                    }
                    f = f.nextSibling
                }
            c = c.nextSibling
        }
        d && "" != d && (e = d.toString().split("/"), 0 < e.length && b.setPan(Number(e[0])), 1 < e.length && b.setTilt(Number(e[1])), 2 < e.length && b.setFov(Number(e[2])));
        if (h) {
            for (f = 0; 6 > f; f++)(e = h.getAttributeNode("tile" + f + "url")) && (Ub[f] = new String(e.nodeValue));
            for (f = 0; 6 > f; f++)(e = h.getAttributeNode("prev" + f + "url")) && (lb[f] = new String(e.nodeValue));
            (e = h.getAttributeNode("tilesize")) &&
            (mb = 1 * e.nodeValue);
            (e = h.getAttributeNode("canvassize")) && (Fb = Number(e.nodeValue));
            (e = h.getAttributeNode("tilescale")) && (Eb = 1 * e.nodeValue);
            if (e = h.getAttributeNode("leveltileurl")) nd = e.nodeValue;
            (e = h.getAttributeNode("leveltilesize")) && (L = Number(e.nodeValue));
            (e = h.getAttributeNode("levelbias")) && (qd = Number(e.nodeValue));
            (e = h.getAttributeNode("overlap")) && (ra = Number(e.nodeValue));
            D = [];
            for (f = h.firstChild; f;) {
                if ("preview" == f.nodeName && (e = f.getAttributeNode("color"))) ob = e.nodeValue;
                "level" == f.nodeName &&
                    (h = {}, e = f.getAttributeNode("width"), h.width = 1 * (e ? e.nodeValue : 1), h.height = 1 * (e ? e.nodeValue : 1), e = f.getAttributeNode("preload"), h.t = r, e && (h.t = 1 == e.nodeValue), e = f.getAttributeNode("preview"), h.Ta = r, e && (h.Ta = 1 == e.nodeValue), h.G = Math.floor((h.width + L - 1) / L), h.$ = Math.floor((h.height + L - 1) / L), h.g = {}, D.push(h));
                f = f.nextSibling
            }
        }
        wb && (ta = Aa = r, ka = document.createElement("canvas"), ka.width = 100, ka.height = 100, ka.id = "dummycanvas", s.appendChild(ka), ya());
        ta && g && (kd(Eb), ld());
        Aa && (0 < D.length ? b.Ma(l) : b.Ma(), b.fa = 0);
        b.addHotspotElements();
        b.update();
        Xb && b.divSkin && b.divSkin.ggViewerInit && b.divSkin.ggViewerInit();
        Xb = r;
        b.hasConfig = l;
        ya()
    };
    b.openUrl = function(a, d) {
        0 < a.length && (".xml" == a.substr(a.length - 4) || ".swf" == a.substr(a.length - 4) || "{" == a.charAt(0) ? b.openNext(na(a), d) : window.open(na(a), d))
    };
    b.openNext = function(a, d) {
        b.isLoaded = r;
        b.hasConfig = r;
        b.checkLoaded = [];
        Ib = 0;
        b.divSkin && b.divSkin.ggReLoaded && b.divSkin.ggReLoaded();
        b.skinObj && b.skinObj.hotspotProxyOut && b.skinObj.hotspotProxyOut(b.hotspot.id);
        ".swf" == a.substr(a.length - 4) && (a = a.substr(0,
            a.length - 4) + ".xml");
        var c = "";
        d && (c = d.toString());
        c = c.replace("$cur", y + "/" + u + "/" + A);
        c = c.replace("$ap", y);
        c = c.replace("$an", b.getPanNorth());
        c = c.replace("$at", u);
        c = c.replace("$af", A);
        if ("" != c) {
            var f = c.split("/");
            3 < f.length && "" != f[3] && (b.startNode = f[3])
        }
        K();
        if ("{" == a.charAt(0))
            if (f = a.substr(1, a.length - 2), nb[f]) b.Ca(nb[f], c), p(a);
            else {
                Bd("invalid node id: " + f);
                return
            } else b.readConfigUrl(a, o, c);
        d && (c = d.toString(), -1 != c.indexOf("$an") && (y += Gc));
        b.update(5)
    };
    b.getNodeIds = function() {
        return sa.slice(0)
    };
    b.getNodeUserdata = function(a) {
        if (!a) return b.userdata;
        if (a = nb[a])
            for (a = a.firstChild; a;) {
                if ("userdata" == a.nodeName) return q(a);
                a = a.nextSibling
            }
        return []
    };
    b.getNodeLatLng = function(a) {
        var a = b.getNodeUserdata(a),
            d = [];
        "" != a.latitude && 0 != a.latitude && 0 != a.longitude && (d.push(a.latitude), d.push(a.longitude));
        return d
    };
    b.getNodeTitle = function(a) {
        return b.getNodeUserdata(a).title
    };
    b.detectBrowser();
    b.createLayers(h);
    b.Wa()
}
window.ggHasHtml5Css3D = Kc;
window.ggHasWebGL = Lc;
window.pano2vrPlayer = pano2vrPlayer;
