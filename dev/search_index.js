var documenterSearchIndex = {"docs":
[{"location":"lib/composite/#Composite-Grids","page":"Composite Grids","title":"Composite Grids","text":"","category":"section"},{"location":"lib/composite/","page":"Composite Grids","title":"Composite Grids","text":"Modules = [CompositeGrids.CompositeGrid]","category":"page"},{"location":"lib/composite/#CompositeGrids.CompositeG","page":"Composite Grids","title":"CompositeGrids.CompositeG","text":"Composite grid that has tree structure. The whole interval is first divided by a panel grid, then each interval of a panel grid is divided by a smaller grid in subgrids. Subgrid could also be composite grid.\n\n\n\n\n\n","category":"module"},{"location":"lib/composite/#CompositeGrids.CompositeG.Composite","page":"Composite Grids","title":"CompositeGrids.CompositeG.Composite","text":"struct Composite{T<:AbstractFloat,PG,SG} <: SimpleG.ClosedGrid\n\nComposite grid generated with panel grid of type PG and subgrids of type SG. PG should always be ClosedGrid, while SG could be any grid.\n\n#Members:\n\nbound : boundary of the grid\nsize : number of grid points\ngrid : grid points\npanel : panel grid\nsubgrids : a vector of subgrids\ninits : index of the first grid point of a subgrid on the whole grid\n\n#Constructor:\n\nfunction Composite{T,PG,SG}(panel, subgrids) where {T<:AbstractFloat,PG,SG}\n\ncreate Composite grid from panel and subgrids. if the boundary grid point of two neighbor subgrids are too close, they will be combined in the whole grid.\n\n\n\n\n\n","category":"type"},{"location":"lib/composite/#Base.floor-Union{Tuple{SG}, Tuple{PG}, Tuple{T}, Tuple{CompositeGrids.CompositeG.Composite{T, PG, SG}, Any}} where {T, PG, SG}","page":"Composite Grids","title":"Base.floor","text":"function Base.floor(grid::Composite{T,PG,SG}, x) where {T,PG,SG}\n\nfirst find the corresponding subgrid by flooring on panel grid, then floor on subgrid and collect result. give the floor result on the whole grid. if floor on panel grid is needed, simply call floor(grid.panel, x).\n\nreturn 1 for x<grid[1] and grid.size-1 for x>grid[end].\n\n\n\n\n\n","category":"method"},{"location":"lib/composite/#CompositeGrids.CompositeG.CompositeLogGrid","page":"Composite Grids","title":"CompositeGrids.CompositeG.CompositeLogGrid","text":"function CompositeLogGrid(type, bound, N, minterval, d2s, order, T=Float64)\n\ncreate a composite grid with a Log grid as panel and subgrids of selected type.\n\n#Members:\n\ntype : type of the subgrids, currently in [:cheb, :gauss, :uniform]\nbound : boundary of the grid\nN : number of grid points of panel grid\nminterval : minimum interval of panel grid\nd2s : panel grid is dense to sparse or not\norder : number of grid points of subgrid\n\n\n\n\n\n","category":"function"},{"location":"lib/composite/#CompositeGrids.CompositeG.LogDensedGrid","page":"Composite Grids","title":"CompositeGrids.CompositeG.LogDensedGrid","text":"function LogDensedGrid(type, bound, dense_at, N, minterval, order, T=Float64)\n\ncreate a composite grid of CompositeLogGrid as subgrids. the grid is densed at selected points in dense_at, which in the real situation could be [kF,] for fermi k grid and [0, 2kF] for bose k grid, etc. if two densed point is too close to each other, they will be combined.\n\n#Members:\n\ntype : type of the subgrid of subgrid, currently in [:cheb, :gauss, :uniform]\nbound : boundary of the grid\ndense_at : list of points that requires densed grid\nN : number of grid points of panel grid\nminterval : minimum interval of panel grid\norder : number of grid points of subgrid\n\n\n\n\n\n","category":"function"},{"location":"lib/interpolate/#Interpolation-and-Integration","page":"Interpolation and Integration","title":"Interpolation and Integration","text":"","category":"section"},{"location":"lib/interpolate/","page":"Interpolation and Integration","title":"Interpolation and Integration","text":"Modules = [CompositeGrids.Interp]","category":"page"},{"location":"lib/interpolate/#CompositeGrids.Interp","page":"Interpolation and Integration","title":"CompositeGrids.Interp","text":"Provide interpolation and integration.\n\n\n\n\n\n","category":"module"},{"location":"lib/interpolate/#CompositeGrids.Interp.dataslice-Tuple{Any, Int64, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.dataslice","text":"function dataslice(data, axes, indices)\n\nReturn a view of data sliced on given axes with given indices. Works like view(data, (:, ..., :, i1:f1,  :, ..., in:fn, :, ..., :)). Type unstable unless slice dims are constant.\n\n#Members:\n\ndata: data to be sliced.\naxes: axes to be sliced. accept Int or NTuple{DIM, Int} for single or multiple axes. when omitted, assume all axes.\nindices: indices of slicing. accept UnitRange{Int} or Vector of UnitRange{Int} like 2:8 or [2:8, 3:7]\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.differentiate1D-Union{Tuple{T}, Tuple{Any, T, Any}} where T","page":"Interpolation and Integration","title":"CompositeGrids.Interp.differentiate1D","text":"function differentiate1D(data, xgrid, x; axis=1)\n\ncalculate integration of data[i] on xgrid. For 1D data, return a number; for multiple dimension, reduce the given axis.\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\nx: point to differentiate\naxis: axis to be differentiated in data\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.findneighbor-Union{Tuple{T}, Tuple{T, Any}} where T","page":"Interpolation and Integration","title":"CompositeGrids.Interp.findneighbor","text":"function findneighbor(xgrid::T, x; method=:default) where {T}\n\nFind neighbor grid points and related information for extrapolating the value of x on xgrid.\n\n#Members:\n\nxgrid: grid to be interpolated\nx: value to be interpolated\nmethod: :default use optimized method, :linear use linear interp.\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.integrate1D-Tuple{CompositeGrids.Interp.ChebIntegrate, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.integrate1D","text":"function integrate1D(::ChebIntegrate, data, xgrid)\n\ncalculate integration of data[i] on xgrid works for grids that have integration weight stored\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.integrate1D-Tuple{CompositeGrids.Interp.CompositeIntegrate, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.integrate1D","text":"function integrate1D(::CompositeIntegrate, data, xgrid)\n\ncalculate integration of data[i] on xgrid call integrate1D for each subgrid and return the sum.\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.integrate1D-Tuple{CompositeGrids.Interp.NoIntegrate, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.integrate1D","text":"function integrate1D(::NoIntegrate, data, xgrid)\n\ncalculate integration of data[i] on xgrid works for grids that do not have integration weight stored\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.integrate1D-Tuple{CompositeGrids.Interp.WeightIntegrate, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.integrate1D","text":"function integrate1D(::WeightIntegrate, data, xgrid)\n\ncalculate integration of data[i] on xgrid works for grids that have integration weight stored\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.integrate1D-Union{Tuple{T}, Tuple{Any, T, Any}} where T","page":"Interpolation and Integration","title":"CompositeGrids.Interp.integrate1D","text":"function integrate1D(data, xgrid, range; axis=1)\n\ncalculate integration of data[i] on xgrid. For 1D data, return a number; for multiple dimension, reduce the given axis.\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\nrange: range of integration, [init, fin] within bound of xgrid.\naxis: axis to be integrated in data\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.integrate1D-Union{Tuple{T}, Tuple{Any, T}} where T","page":"Interpolation and Integration","title":"CompositeGrids.Interp.integrate1D","text":"function integrate1D(data, xgrid; axis=1)\n\ncalculate integration of data[i] on xgrid. For 1D data, return a number; for multiple dimension, reduce the given axis.\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\naxis: axis to be integrated in data\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.interp1D-Tuple{CompositeGrids.Interp.ChebInterp, Any, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.interp1D","text":"function interp1D(::ChebInterp, data, xgrid, x)\n\nlinear interpolation of data(x), barycheb for BaryCheb grid\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\nx: x\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.interp1D-Tuple{CompositeGrids.Interp.CompositeInterp, Any, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.interp1D","text":"function interp1D(::CompositeInterp,data, xgrid, x)\n\nlinear interpolation of data(x), first floor on panel to find subgrid, then call interp1D on subgrid \n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\nx: x\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.interp1D-Tuple{CompositeGrids.Interp.LinearInterp, Any, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.interp1D","text":"function interp1D(::LinearInterp,data, xgrid, x)\n\nlinear interpolation of data(x), use floor and linear1D\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\nx: x\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.interp1D-Union{Tuple{T}, Tuple{Any, T, Any}} where T","page":"Interpolation and Integration","title":"CompositeGrids.Interp.interp1D","text":"function interp1D(data, xgrid, x; axis=1, method=InterpStyle(T))\n\nlinear interpolation of data(x) with single or multiple dimension. For 1D data, return a number; for multiple dimension, reduce the given axis.\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\nx: x\naxis: axis to be interpolated in data\nmethod: by default use optimized method; use linear interp if Interp.LinearInterp()\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.interp1DGrid-Tuple{CompositeGrids.Interp.CompositeInterp, Any, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.interp1DGrid","text":"function interp1DGrid(::CompositeInterp, data, xgrid, grid)\n\nlinear interpolation of data(grid[1:end]), return a Vector grid should be sorted.\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\ngrid: points to be interpolated on\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.interp1DGrid-Tuple{Union{CompositeGrids.Interp.ChebInterp, CompositeGrids.Interp.LinearInterp}, Any, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.interp1DGrid","text":"function interp1DGrid(::Union{LinearInterp,ChebInterp}, data, xgrid, grid)\n\nlinear interpolation of data(grid[1:end]), return a Vector simply call interp1D on each points\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\ngrid: points to be interpolated on\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.interp1DGrid-Union{Tuple{T}, Tuple{Any, T, Any}} where T","page":"Interpolation and Integration","title":"CompositeGrids.Interp.interp1DGrid","text":"function interp1DGrid(data, xgrid, grid; axis=1, method=InterpStyle(T))\n\nFor 1D data, do interpolation of data(grid[1:end]), return a Vector. For ND data, do interpolation of data(grid[1:end]) at given axis, return data of same dimension.\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\ngrid: points to be interpolated on\naxis: axis to be interpolated in data\nmethod: by default use optimized method; use linear interp if :linear\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.interpsliced-Tuple{Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.interpsliced","text":"function interpsliced(neighbor, data; axis=1)\n\nInterpolate with given neighbor and sliced data. Assume data already sliced on given axis.\n\n#Members:\n\nneighbor: neighbor from findneighbor()\ndata: sliced data\naxis: axis sliced and to be interpolated\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.linear1D-Tuple{Any, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.linear1D","text":"function linear1D(data, xgrid, x)\n\nlinear interpolation of data(x)\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\nx: x\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.linear2D-NTuple{5, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.linear2D","text":"linear2D(data, xgrid, ygrid, x, y) \n\nlinear interpolation of data(x, y)\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\nygrid: one-dimensional grid of y\ndata: two-dimensional array of data\nx: x\ny: y\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.linearND-Tuple{Any, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.linearND","text":"function linearND(data, xgrids, xs)\n\nlinear interpolation of data(xs)\n\n#Arguments:\n\nxgrids: n-dimensional grids, xgrids[i] is a 1D grid\ndata: n-dimensional array of data\nxs: list of x, x[i] corresponds to xgrids[i]\n\n\n\n\n\n","category":"method"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = CompositeGrids","category":"page"},{"location":"#CompositeGrids","page":"Home","title":"CompositeGrids","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for CompositeGrids.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Pages = [\n    \"lib/simple.md\",\n    \"lib/composite.md\",\n    \"lib/interpolate.md\",\t\n]\nDepth = 1","category":"page"},{"location":"lib/simple/#Basic-Grids","page":"Basic Grids","title":"Basic Grids","text":"","category":"section"},{"location":"lib/simple/","page":"Basic Grids","title":"Basic Grids","text":"Modules = [CompositeGrids.SimpleGrid]","category":"page"},{"location":"lib/simple/#CompositeGrids.SimpleG","page":"Basic Grids","title":"CompositeGrids.SimpleG","text":"Basic grids including common grids like arbitrary grids, uniform grids, log grids, and optimized grids like barycheb for interpolation and gausslegendre for integration.\n\n\n\n\n\n","category":"module"},{"location":"lib/simple/#CompositeGrids.SimpleG.AbstractGrid","page":"Basic Grids","title":"CompositeGrids.SimpleG.AbstractGrid","text":"All Grids are derived from AbstractGrid; ClosedGrid has bound[1], bound[2] == grid[1], grid[end], while OpenGrid has bound[1]<grid[1]<grid[end]<bound[2]\n\n\n\n\n\n","category":"type"},{"location":"lib/simple/#CompositeGrids.SimpleG.Arbitrary","page":"Basic Grids","title":"CompositeGrids.SimpleG.Arbitrary","text":"struct Arbitrary{T<:AbstractFloat} <: ClosedGrid\n\nArbitrary grid generated from given sorted grid.\n\n#Members:\n\nbound : boundary of the grid\nsize : number of grid points\ngrid : grid points\nweight : integration weight\n\n#Constructor:\n\nfunction Arbitrary{T}(grid) where {T<:AbstractFloat}\n\n\n\n\n\n","category":"type"},{"location":"lib/simple/#CompositeGrids.SimpleG.BaryCheb","page":"Basic Grids","title":"CompositeGrids.SimpleG.BaryCheb","text":"struct BaryCheb{T<:AbstractFloat} <: OpenGrid\n\nBaryCheb grid generated on [bound[1], bound[2]] with order N.\n\n#Members:\n\nbound : boundary of the grid\nsize : number of grid points\ngrid : grid points\nweight : interpolation weight\n\n#Constructor:\n\nfunction BaryCheb{T}(bound, size) where {T<:AbstractFloat}\n\n\n\n\n\n","category":"type"},{"location":"lib/simple/#CompositeGrids.SimpleG.GaussLegendre","page":"Basic Grids","title":"CompositeGrids.SimpleG.GaussLegendre","text":"struct GaussLegendre{T<:AbstractFloat} <: OpenGrid\n\nGaussLegendre grid generated on [bound[1], bound[2]] with order N.\n\n#Members:\n\nbound : boundary of the grid\nsize : number of grid points\ngrid : grid points\nweight : integration weight\n\n#Constructor:\n\nfunction GaussLegendre{T}(bound, size) where {T<:AbstractFloat}\n\n\n\n\n\n","category":"type"},{"location":"lib/simple/#CompositeGrids.SimpleG.Log","page":"Basic Grids","title":"CompositeGrids.SimpleG.Log","text":"struct Log{T<:AbstractFloat} <: ClosedGrid\n\nLog grid generated on [bound[1], bound[2]] with N grid points. Minimal interval is set to be minterval. Dense to sparse if d2s, vice versa.\n\nOn [0, 1], a typical d2s Log grid looks like [0, λ^(N-1), ..., λ^2, λ, 1].\n\n#Members:\n\nbound : boundary of the grid\nsize : number of grid points\ngrid : grid points\nweight : integration weight\nλ : scale parameter\nd2s : dense to sparse or not\n\n#Constructor:\n\nfunction Log{T}(bound, size, minterval, d2s) where {T<:AbstractFloat}\n\n\n\n\n\n","category":"type"},{"location":"lib/simple/#CompositeGrids.SimpleG.Uniform","page":"Basic Grids","title":"CompositeGrids.SimpleG.Uniform","text":"struct Uniform{T<:AbstractFloat} <: ClosedGrid\n\nUniform grid generated on [bound[1], bound[2]] with N points\n\n#Members:\n\nbound : boundary of the grid\nsize : number of grid points\ngrid : grid points\nweight : integration weight\n\n#Constructor:\n\nfunction Uniform{T}(bound, size) where {T<:AbstractFloat}\n\n\n\n\n\n","category":"type"},{"location":"lib/simple/#Base.floor-Tuple{CompositeGrids.SimpleG.AbstractGrid, Any}","page":"Basic Grids","title":"Base.floor","text":"function Base.floor(grid::AbstractGrid, x) #where {T}\n\nuse basic searchsorted function to find the index of largest grid point smaller than x.\n\nreturn 1 for x<grid[1] and grid.size-1 for x>grid[end].\n\n\n\n\n\n","category":"method"},{"location":"lib/simple/#Base.floor-Union{Tuple{T}, Tuple{CompositeGrids.SimpleG.Log{T}, Any}} where T","page":"Basic Grids","title":"Base.floor","text":"function Base.floor(grid::Log{T}, x) where {T}\n\nfind the index of largest grid point smaller than x.\n\nreturn 1 for x<grid[1] and grid.size-1 for x>grid[end].\n\n\n\n\n\n","category":"method"},{"location":"lib/simple/#Base.floor-Union{Tuple{T}, Tuple{CompositeGrids.SimpleG.Uniform{T}, Any}} where T","page":"Basic Grids","title":"Base.floor","text":"function Base.floor(grid::Uniform{T}, x) where {T}\n\nfind the index of largest grid point smaller than x.\n\nreturn 1 for x<grid[1] and grid.size-1 for x>grid[end].\n\n\n\n\n\n","category":"method"},{"location":"lib/simple/#CompositeGrids.SimpleG.barycheb-NTuple{5, Any}","page":"Basic Grids","title":"CompositeGrids.SimpleG.barycheb","text":"function barycheb(n, x, f, wc, xc)\n\nBarycentric Lagrange interpolation at Chebyshev nodes Reference: Berrut, J.P. and Trefethen, L.N., 2004. Barycentric lagrange interpolation. SIAM review, 46(3), pp.501-517.\n\nArguments\n\nn: order of the Chebyshev interpolation\nx: coordinate to interpolate\nf: array of size n, function at the Chebyshev nodes\nwc: array of size n, Barycentric Lagrange interpolation weights\nxc: array of size n, coordinates of Chebyshev nodes\n\nReturns\n\nInterpolation result\n\n\n\n\n\n","category":"method"},{"location":"lib/simple/#CompositeGrids.SimpleG.barychebinit-Tuple{Any}","page":"Basic Grids","title":"CompositeGrids.SimpleG.barychebinit","text":"barychebinit(n)\n\nGet Chebyshev nodes of first kind and corresponding barycentric Lagrange interpolation weights.  Reference: Berrut, J.P. and Trefethen, L.N., 2004. Barycentric lagrange interpolation. SIAM review, 46(3), pp.501-517.\n\nArguments\n\nn: order of the Chebyshev interpolation\n\nReturns\n\nChebyshev nodes\nBarycentric Lagrange interpolation weights\n\n\n\n\n\n","category":"method"}]
}
