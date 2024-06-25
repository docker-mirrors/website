<a href="https://dockermirror.com" target="_blank" rel="noopener"><img src="https://github.com/docker-mirrors/website/raw/main/public/docker_mirrors_logo_and_text.png?sanitize=true" alt="Docker Mirror Logo" style="max-width: 100%;" /></a>

[![Percentage of issues still open](http://isitmaintained.com/badge/open/docker-mirrors/website.svg)](http://isitmaintained.com/project/docker-mirrors/website 'Percentage of issues still open')
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/docker-mirrors/website.svg)](http://isitmaintained.com/project/docker-mirrors/website 'Average time to resolve an issue')
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

加速镜像下载. 解除下载限制. 配套国内搜索镜像网站 - [docker-mirrors](https://dockermirror.com).

<a href="https://dockermirror.com" target="_blank" rel="noopener"><video style="max-width: 100%;" controls><source src="https://github.com/docker-mirrors/website/raw/main/public/docker-mirrors-example.mp4?sanitize=true"></source></video></a>

## 🌎 [Website](https://dockermirror.com)

<div align="center">

**[📖Read The Docs](https://dockermirror.com/docs)** &nbsp;|&nbsp; [😶‍🌫️Searching Images](https://dockermirror.comn)

</div>

## 特性

- [x] 💥 快速连接
- [x] ✨ [配套网站](https://dockermirror.com)
- [x] 👯 团队更新

## 使用

### 使用 Docker File

编辑 `/etc/docker/daemon.json`，并添加 [registry-mirror](https://docs.docker.com/docker-hub/mirror/#configure-the-docker-daemon) 键和值，使更改始终生效。

```json
{
  "registry-mirrors": ["https://registry.dockermirror.com"]
}
```

更多细节, 见 [docker 文档](https://docs.docker.com/docker-hub/mirror/#configure-the-docker-daemon).

如果你正在使用 orbstack. 你也可以直接在 `~/.orbstack/config/docker.json` 中编辑配置，然后用 `orb restart docker` 重启引擎。

```json
{
  "hosts": ["https://registry.dockermirror.com"]
}
```

更多 orb 细节, 见 [orb 文档](https://docs.orbstack.dev/docker/#engine-config).

### 命令行使用配置

在手动拉取 dockerd 镜像时，通过 --registry-mirror 选项来使更改 registry。

```bash
$ docker pull ubuntu --registry-mirror=https://registry.dockermirror.com
```

更多细节, 见 [docker pull 文档](https://docs.docker.com/reference/cli/docker/image/pull/?highlight=docker&highlight=pull).

### 直接使用 Registry

手动指定要从注册表中提取的路径。注册表路径类似于 URL，但不包含协议指定符 (https://)。

```bash
$ docker pull registry.dockermirror.com/ubuntu
```

更多细节, 见 [docker pull-from-a-different-registry 文档](https://docs.docker.com/reference/cli/docker/image/pull/?highlight=docker&highlight=pull#pull-from-a-different-registry).

## 支持

为获得更快的服务请支持我们！！

<table>
  <tr align="center">
    <td>
      <a href="https://afdian.net/order/create?plan_id=1034de202d3f11ef8b0b52540025c377&product_type=0&remark=" target="_blank">
        <img width="150" src="https://cdn.jsdelivr.net/gh/innocces/DrawingBed/2022-12-04/1670124736895-afdian.png" />
      </a>
    </td>
  </tr>
</table>
