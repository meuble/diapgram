#! /usr/bin/env ruby

require "rubygems"
require "instagram"
require "awesome_print"

DATA_PATH = "./data.jsonp"
TOKEN = "your_token"
SECRET = "your_secret"

class Poller
  def initialize(client_id, client_secret)
    Instagram.configure do |config|
      config.client_id = client_id
      config.client_secret = client_secret
    end
  end

  def get_urls
    Instagram.tag_recent_media("lovemp").map {|d| d.images.standard_resolution.url.to_s }
  end

  def update_data
    data = get_old_data
    count = data.size

    self.get_urls.each do |url|
      data << url unless data.include?(url)
    end
    ap "#{data.size - count} new urls"

    write_data(data)
  end

  def get_old_data
    IO.readlines(DATA_PATH).map {|l| l.chomp}
  end

  def write_data(data)
    File.open(DATA_PATH, 'w+') {|f| f.write(data.join("\n")) }
  end

  def poll
    loop do
      self.update_data
      sleep(5)
    end
  end
end

Poller.new(TOKEN, SECRET).poll