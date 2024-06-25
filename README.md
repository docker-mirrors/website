<a href="https://dockermirror.com" target="_blank" rel="noopener"><img src="https://github.com/docker-mirrors/website/raw/main/public/docker_mirrors_logo_and_text.png?sanitize=true" alt="Docker Mirror Logo" style="max-width: 100%;" /></a>

[![Percentage of issues still open](http://isitmaintained.com/badge/open/docker-mirrors/website.svg)](http://isitmaintained.com/project/docker-mirrors/website 'Percentage of issues still open')
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/docker-mirrors/website.svg)](http://isitmaintained.com/project/docker-mirrors/website 'Average time to resolve an issue')
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Accelerate mirror downloads. Unlocks download restrictions. Support for searching domestic mirrors - [docker-mirrors](https://dockermirror.com).

<a href="https://dockermirror.com" target="_blank" rel="noopener"><video style="max-width: 100%;" controls><source src="https://github.com/docker-mirrors/website/raw/main/public/docker-mirrors-example.mp4?sanitize=true"></source></video></a>

<div align="center">

## 🌎 [Website](https://dockermirror.com)

</div>

<div align="center">

**[📖Read The Docs](https://dockermirror.com/docs)** &nbsp;|&nbsp; [😶‍🌫️Searching Images](https://dockermirror.comn)

</div>

## Features

- [x] 💥 Fast connect
- [x] 🛑 Automatic cache
- [x] ✨ [accessible website](https://dockermirror.com)
- [x] 👯 Team update

## Usage

### Docker File Mirror Setting

edit `/etc/docker/daemon.json` and add the [registry-mirror](https://docs.docker.com/docker-hub/mirror/#configure-the-docker-daemon) key and value, to make the change persistent.

```json
{
  "registry-mirrors": ["https://registry.dockermirror.com"]
}
```

For more details, see [docker docs](https://docs.docker.com/docker-hub/mirror/#configure-the-docker-daemon).

If you are the user of orbstack. You can also edit the config directly at `~/.orbstack/config/docker.json` and restart the engine with `orb restart docker`.

```json
{
  "hosts": ["https://registry.dockermirror.com"]
}
```

For more orb details, see [orb docs](https://docs.orbstack.dev/docker/#engine-config).

### Pass options

pass the --registry-mirror option when starting dockerd manually, to make the change persistent.

```bash
$ docker pull ubuntu --registry-mirror=https://registry.dockermirror.com
```

For more details, see [docker pull docs](https://docs.docker.com/reference/cli/docker/image/pull/?highlight=docker&highlight=pull).

### Direct Use Registry

manually specify the path of a registry to pull from. A registry path is similar to a URL, but does not contain a protocol specifier (https://).

```bash
$ docker pull registry.dockermirror.com/ubuntu
```

For more details, see [docker pull-from-a-different-registry docs](https://docs.docker.com/reference/cli/docker/image/pull/?highlight=docker&highlight=pull#pull-from-a-different-registry).

## Support

Support Us for better services！！

<table>
  <tr align="center">
    <td>
      <a href="https://afdian.net/order/create?plan_id=1034de202d3f11ef8b0b52540025c377&product_type=0&remark=" target="_blank">
        <img width="150" src="https://cdn.jsdelivr.net/gh/innocces/DrawingBed/2022-12-04/1670124736895-afdian.png" />
      </a>
    </td>
  </tr>
</table>
